var ejs = require("ejs");

export default function EjsMail(context, params){

    //context needs to map to template name
    const path = `./templates/${context}.ejs`
    
    let result = {}
    ejs.renderFile(path,params, function(err, data){
        if(err){
            result['ok'] = false
            result['error'] = err.message
        }else{
            result['ok'] = true
            result['html_data'] = data
        }
        return result
    })
}
