let nonSanitizedValues = []
module.exports = {
    create(context){
        return context.parserServices.defineTemplateBodyVisitor(
            {
                "VAttribute[directive=true][key.name.name = 'html']"(node) {
                    if(
                        (
                            node.value.expression.type === 'Identifier' &&
                            nonSanitizedValues.includes(node.value.expression.name)
                        ) ||
                        (
                            node.value.expression.type === 'CallExpression' &&
                            node.value.expression.callee.type === 'Identifier' &&
                            node.value.expression.callee.name !== '$sanitize'
                        )
                    ){
                        context.report({
                            node: node,
                            loc: node.loc,
                            message: "'v-html' directive can lead to XSS attack! You must sanitize!!"
                        })
                    }
                },
            },
            {
              "Property[kind = 'init'][key.type = 'Identifier'][key.name = 'computed']"(node){
                  node.value.properties.forEach(property => {
                      property.value.body.body.forEach(statement => {
                          if(
                              (
                                  statement.type === 'ReturnStatement' &&
                                  statement.argument.callee &&
                                  statement.argument.callee.property.name !== '$sanitize'
                              ) ||
                              (
                                  statement.type === 'ReturnStatement' &&
                                  statement.argument.property &&
                                  statement.argument.property.name !== '$sanitize'
                              )
                          ) {
                              nonSanitizedValues.push(property.key.name)
                          }
                      })
                  })
              }
            })
        }
    }


