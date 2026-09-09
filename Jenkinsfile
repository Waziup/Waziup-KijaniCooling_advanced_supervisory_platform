pipeline {
    agent any
    parameters {
        booleanParam(name: 'push_to_dockerhub', defaultValue: false, description: 'Set true to push images to dockerhub.')
    }
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        FRONTEND_DOCKER_IMAGE_NAME = 'waziup/kijanicooling-backend'
        BACKEND_DOCKER_IMAGE_NAME = 'waziup/kijanicooling-frontend'
        DOCKER_TAG_NAME = 'latest'
        DOCKER_PLATFORM = 'linux/arm64/v8'
        FORMER_IMAGES_DOCKER_ID = ''
        APP_NAME = 'waziup.kijanicooling-supervisory-platform'
        LOCAL_WAZIGATE_IP = 'wazigate.local'
    }

    stage('Checkout') {
        steps {
            script {
                echo "Fetching latest commit from remote..."
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']], // Change 'main' if your branch name is different
                    userRemoteConfigs: [[
                        url: 'https://github.com/Waziup/Waziup-KijaniCooling_advanced_supervisory_platform.git',
                        credentialsId: 'your-github-credentials-id' // Remove this line if the repo is public
                    ]],
                    extensions: [
                        [$class: 'CleanBeforeCheckout']
                    ]
                ])
            }
        }
    }

    stages {
        stage('Buildx Setup') {
            steps {
                script {
                    sh 'docker run --rm --privileged multiarch/qemu-user-static --reset -p yes'
                    // Create if it does not exist, otherwise switch to it
                    sh '''
                        if ! docker buildx inspect rpibuilder >/dev/null 2>&1; then
                            docker buildx create --name rpibuilder --platform linux/arm64/v8
                        fi
                        docker buildx use rpibuilder
                        docker buildx inspect --bootstrap
                    '''
            }
        }

        stage('Docker Cross-Build') {
            steps {
                script {
                    // 1. Fetch former Backend image ID
                    def formerBackendID = sh(
                        script: "docker images -q --filter reference=${BACKEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME}",
                        returnStdout: true
                    ).trim()

                    // 2. Fetch former Frontend image ID
                    def formerFrontendID = sh(
                        script: "docker images -q --filter reference=${FRONTEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME}",
                        returnStdout: true
                    ).trim()

                    writeFile file: 'former_backend_image_id.txt', text: formerBackendID
                    stash name: 'former_backend_image_id', includes: 'former_backend_image_id.txt'

                    writeFile file: 'former_frontend_image_id.txt', text: formerFrontendID
                    stash name: 'former_frontend_image_id', includes: 'former_frontend_image_id.txt'
                    
                    // Build the backend image
                    sh """
                        docker buildx build \\
                            --platform ${DOCKER_PLATFORM} \\
                            -t ${BACKEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME} \\
                            --no-cache \\
                            --pull \\
                            --build-arg CACHEBUST=\$(date +%s) \\
                            --load -f Dockerfile .
                    """

                    // Build the frontend image
                    sh """
                        docker buildx build \\
                            --platform ${DOCKER_PLATFORM} \\
                            -t ${FRONTEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME} \\
                            --no-cache \\
                            --pull \\
                            --build-arg CACHEBUST=\$(date +%s) \\
                            --build-arg VITE_WAZIGATE_API_URL=http://localhost \\
                            --load -f ./multimodal_interface/web_application/Dockerfile ./multimodal_interface/web_application
                    """

                }
            }
        }

        stage('Clean Old Untagged Images') {
            steps {
                script {
                    // Replace former backend image ID
                    unstash 'former_backend_image_id'
                    def formerBackendID = readFile('former_backend_image_id.txt').trim()
                    if (formerBackendID) {
                        echo "Removing old backend image ID: ${formerBackendID}"
                        sh "docker rmi ${formerBackendID} || true"
                    } else {
                        echo "No old backend image to remove."
                    }

                    // Replace former frontend image ID
                    unstash 'former_frontend_image_id'
                    def formerFrontendID = readFile('former_frontend_image_id.txt').trim()
                    if (formerFrontendID) {
                        echo "Removing old frontend image ID: ${formerFrontendID}"
                        sh "docker rmi ${formerFrontendID} || true"
                    } else {
                        echo "No old frontend image to remove."
                    }
                }
            }
        }

        stage('Push to local Gateway & restart') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    script {
                        def backendImage = "${BACKEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME}"
                        def frontendImage = "${FRONTEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME}"

                        echo "Pushing Docker images to local gateway..."

                        withCredentials([string(credentialsId: 'SSH_PASSWORD_WAZIGATE', variable: 'SSH_PASSWORD_WAZIGATE')]) {

                            // Push Backend Image
                            sh """
                                docker save ${backendImage} | gzip | pv | \\
                                sshpass -p "$SSH_PASSWORD_WAZIGATE" \\
                                ssh -o StrictHostKeyChecking=no pi@${LOCAL_WAZIGATE_IP} docker load
                            """

                            // Push Frontend Image
                            sh """
                                docker save ${frontendImage} | gzip | pv | \\
                                sshpass -p "$SSH_PASSWORD_WAZIGATE" \\
                                ssh -o StrictHostKeyChecking=no pi@${LOCAL_WAZIGATE_IP} docker load
                            """

                            echo "Successfully pushed images to local gateway."

                            // Copy compose + package.json
                            sh """
                                sshpass -p "$SSH_PASSWORD_WAZIGATE" scp -o StrictHostKeyChecking=no docker-compose.yml pi@${LOCAL_WAZIGATE_IP}:/tmp/docker-compose.yml
                                sshpass -p "$SSH_PASSWORD_WAZIGATE" scp -o StrictHostKeyChecking=no package.json pi@${LOCAL_WAZIGATE_IP}:/tmp/package.json

                                sshpass -p "$SSH_PASSWORD_WAZIGATE" ssh -o StrictHostKeyChecking=no pi@${LOCAL_WAZIGATE_IP} '
                                    echo "$SSH_PASSWORD_WAZIGATE" | sudo -S sh -e -c "
                                        mkdir -p /var/lib/wazigate/apps/${APP_NAME};
                                        mv /tmp/docker-compose.yml /var/lib/wazigate/apps/${APP_NAME}/docker-compose.yml;
                                        mv /tmp/package.json /var/lib/wazigate/apps/${APP_NAME}/package.json;
                                    "
                                '
                            """

                            echo "Successfully copied docker-compose and package.json files to local gateway."

                            // Restart application
                            sh """
                                sshpass -p "$SSH_PASSWORD_WAZIGATE" ssh -o StrictHostKeyChecking=no pi@${LOCAL_WAZIGATE_IP} '
                                    cd /var/lib/wazigate/apps/${APP_NAME} &&
                                    echo "$SSH_PASSWORD_WAZIGATE" | sudo -S sh -e -c "
                                        docker-compose stop;
                                        docker-compose rm -f;
                                        docker-compose up -d --no-build;
                                        docker image prune -f;
                                    "
                                '
                            """

                            echo "Successfully deployed stack to local gateway and cleaned up."
                        }
                    }
                }
            }
        }

        stage('Test Docker Image - Run Unit Tests') {
            steps {
                echo "No tests created (TODO)!"
            }
        }


        stage('Save Docker Image') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    script {
                        sh '''
                            echo "Saving and compressing Backend and Frontend Docker images..."

                            docker save ${BACKEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME} | gzip -9 > kijanicooling-backend.tar.gz
                            docker save ${FRONTEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME} | gzip -9 > kijanicooling-frontend.tar.gz

                            ls -lh kijanicooling-backend.tar.gz kijanicooling-frontend.tar.gz
                        '''

                        archiveArtifacts artifacts: 'kijanicooling-backend.tar.gz, kijanicooling-frontend.tar.gz', fingerprint: true
                    }
                }
            }
        }

        stage('Push to dockerhub'){
            when { expression { params.push_to_dockerhub } }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    script {
                        def backendImage = "${BACKEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME}"
                        def frontendImage = "${FRONTEND_DOCKER_IMAGE_NAME}:${DOCKER_TAG_NAME}"

                        retry(2) {
                            sh "docker push ${backendImage}"
                            sh "docker push ${frontendImage}"
                        }
                        echo "Successfully pushed images to Docker Hub."
                    }
                }
            }
        }
    }


    post {
        always {
            sh 'docker image prune -f || true'                     // dangling layers + builder intermediates
            sh 'docker buildx prune -f --keep-storage 2GB || true' // cap buildx build cache
        }
    }
}
}