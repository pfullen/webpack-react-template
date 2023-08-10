#!groovy
@Library('pipeline') _

import static com.nextiva.SharedJobsStaticVars.*

def BRANCH_NAME = "${env.BRANCH_NAME}"

jobTemplate {
    APP_NAME = 'nextiva-connect-email'
    BASIC_INVENTORY_PATH = 'ansible/role-based_playbooks/inventory/static-deploy/'
    PLAYBOOK_PATH = 'ansible/role-based_playbooks/static-deploy.yml'
    CHANNEL_TO_NOTIFY = 'nextivaconnect-cicd'
    NODE_LABEL = 'slave_node14'

    ansibleEnvMap = [dev       : "dev",
                     qa        : "rc",
                     production: "production"]

    switch (BRANCH_NAME) {
      case ~/^release\/.+$/:
          BUILD_SOURCEMAPS_CLEAN = 'GENERATE_SOURCEMAP=false npm run test'
          break
      case ~/^hotfix\/.+$/:
          BUILD_SOURCEMAPS_CLEAN = 'GENERATE_SOURCEMAP=false npm run test'
          break
      case 'master':
          BUILD_SOURCEMAPS_CLEAN = 'GENERATE_SOURCEMAP=false npm run test'
          break
      default:
          BUILD_SOURCEMAPS_CLEAN = 'GENERATE_SOURCEMAP=true npm run test'
          break
    }

    projectFlow = ['language'    : 'js',
                   'distPath': 'dist',
                   'testCommands': """
                                   npm ci && npm run test:coverage && npm run build
                                   """,
                   'buildCommands': """
                                    ${BUILD_SOURCEMAPS_CLEAN}
                                    """,
                   'publishStaticAssetsToS3' : 'true']

    healthCheckMap = [dev       : ["http://dev.dev.nextiva.xyz/apps/nextiva-connect-email/build.properties"],
                      qa        : ["http://rc.rc.nextiva.xyz/apps/nextiva-connect-email/build.properties"],
                      production: ["http://nextiva.nextos.com/apps/nextiva-connect-email/build.properties"]]

    branchPermissionsMap = [dev       : ["authenticated"],
                            qa        : ["authenticated"],
                            production: ["authenticated"]]
}
