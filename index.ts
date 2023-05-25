import { openapi, XOasObject } from '@ts-stack/openapi-spec';
import $RefParser from "@apidevtools/json-schema-ref-parser"; 
import * as fs from 'fs-extra'
import OperationParser from './src/OperationParser'

const appeau = "asset/swagger_docs_appeau_5_25_2023.json"
const dest_appeau = 'D:/code/appeauPythonClient/sample'

const deepomics = "asset/swagger_docs_deepomics.json"
const dest_deepomics = "generated/python"

// Load config
const main = {
    async init(config_path: string, destination: string) {
        try {
            // async/await syntax
            const openapi_config: XOasObject = await $RefParser.dereference(JSON.parse(fs.readFileSync(config_path, 'utf-8'))) as XOasObject
            const operation_generator = new OperationParser(openapi_config)
            operation_generator.build()

            const python_template = fs.readFileSync('./src/python/Operation.mustache', 'utf-8')
            operation_generator.digest(python_template, destination, '.py')
        }
        catch (err) {
            console.log(err)
            // Error
        }
    }
}

main.init(appeau, dest_appeau)
// main.init(deepomics, dest_deepomics)