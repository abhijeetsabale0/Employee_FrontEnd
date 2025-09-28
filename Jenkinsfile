pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }

    environment {
        // make sure local node binaries (react-scripts, etc.) are on PATH
        PATH = "${WORKSPACE}/node_modules/.bin:${env.PATH}"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git url: "https://github.com/abhijeetsabale0/Employee_FrontEnd.git", branch: "main"
            }
        }

        stage('Clean Workspace') {
            steps {
                sh 'rm -rf node_modules package-lock.json build'
            }
        }

        stage('npm install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Fix Permissions') {
            steps {
                sh 'chmod +x node_modules/.bin/* || true'
            }
        }

        stage('Node build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('s3 diploy') {
            steps {
                sh 'aws s3 sync build/ s3://react-app-abhijeet --delete'
            }
        }
    }
}
