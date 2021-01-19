const rule = require('./index')
const RuleTester = require('eslint').RuleTester
ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})
ruleTester.run('index', rule, {
    valid: [
        {
            filename: 'test.vue',
            code: '<template>\n' +
                  '  <div v-html="$sanitize(cleanMessage)"></div>\n' +
                  '</template>\n' +
                  '\n' +
                  '<script>\n' +
                  ' export default {\n' +
                  '  data () {\n' +
                  '    return {\n' +
                  '      message:`\n        My <strong>milkshake</strong> brings all the boys to the yard<br/>\n        And <i>they\'re</i> like, it\'s better than yours\n      `\n' +
                  '    }\n' +
                  '  },\n' +
                  '  computed: {\n' +
                  '    cleanMessage() {\n' +
                  '      return this.$sanitize(this.message)\n' +
                  '    }\n' +
                  '  }\n' +
                  ' }\n' +
                  '</script>'
        },
        {
            filename: 'test.vue',
            code: '<template>\n' +
                  '  <div v-html="$sanitize(dirtyMessage)"></div>\n' +
                  '</template>\n' +
                  '\n' +
                  '<script>\n' +
                  ' export default {\n' +
                  '  data () {\n' +
                  '    return {\n' +
                  '      message:`\n        My <strong>milkshake</strong> brings all the boys to the yard<br/>\n        And <i>they\'re</i> like, it\'s better than yours\n      `\n' +
                  '    }\n' +
                  '  },\n' +
                  '  computed: {\n' +
                  '    dirtyMessage() {\n' +
                  '      return this.message\n' +
                  '    }\n' +
                  '  }\n' +
                  ' }\n' +
                  '</script>'
        },
        {
            filename: 'test.vue',
            code: '<template>\n' +
                  '  <div v-html="$sanitize(dirtyMessage)"></div>\n' +
                  '  <div v-html="cleanMessage"></div>/n' +
                  '</template>\n' +
                  '\n' +
                  '<script>\n' +
                  ' export default {\n' +
                  '  data () {\n' +
                  '    return {\n' +
                  '      message:`\n        My <strong>milkshake</strong> brings all the boys to the yard<br/>\n        And <i>they\'re</i> like, it\'s better than yours\n      `\n' +
                  '    }\n' +
                  '  },\n' +
                  '  computed: {\n' +
                  '    dirtyMessage() {\n' +
                  '      return this.message\n' +
                  '    },\n' +
                  '    cleanMessage() {\n' +
                  '      return this.$sanitize(this.message)\n' +
                  '    }\n' +
                  '  }\n' +
                  ' }\n' +
                  '</script>'
        },
        {
            filename: 'test.vue',
            code: '<template>\n' +
                  '  <div v-html="$sanitize(message)"></div>\n' +
                  '  <div v-html="cleanMessage"></div>/n' +
                  '</template>\n' +
                  '\n' +
                  '<script>\n' +
                  ' export default {\n' +
                  '  data () {\n' +
                  '    return {\n' +
                  '      message:`\n        My <strong>milkshake</strong> brings all the boys to the yard<br/>\n        And <i>they\'re</i> like, it\'s better than yours\n      `\n' +
                  '    }\n' +
                  '  },\n' +
                  '  computed: {\n' +
                  '    dirtyMessage() {\n' +
                  '      return this.message\n' +
                  '    },\n' +
                  '    cleanMessage() {\n' +
                  '      return this.$sanitize(this.message)\n' +
                  '    }\n' +
                  '  }\n' +
                  ' }\n' +
                  '</script>',
        }
    ],
    invalid: [
        {
            filename: 'test.vue',
            code: '<template>\n' +
                  '  <div v-html="dirtyMessage"></div>\n' +
                  '  <div v-html="cleanMessage"></div>/n' +
                  '</template>\n' +
                  '\n' +
                  '<script>\n' +
                  ' export default {\n' +
                  '  data () {\n' +
                  '    return {\n' +
                  '      message:`\n        My <strong>milkshake</strong> brings all the boys to the yard<br/>\n        And <i>they\'re</i> like, it\'s better than yours\n      `\n' +
                  '    }\n' +
                  '  },\n' +
                  '  computed: {\n' +
                  '    dirtyMessage() {\n' +
                  '      return this.message\n' +
                  '    },\n' +
                  '    cleanMessage() {\n' +
                  '      return this.$sanitize(this.message)\n' +
                  '    }\n' +
                  '  }\n' +
                  ' }\n' +
                  '</script>',
            output: '<template>\n' +
                  '  <div v-html="dirtyMessage"></div>\n' +
                  '  <div v-html="cleanMessage"></div>/n' +
                  '</template>\n' +
                  '\n' +
                  '<script>\n' +
                  ' export default {\n' +
                  '  data () {\n' +
                  '    return {\n' +
                  '      message:`\n        My <strong>milkshake</strong> brings all the boys to the yard<br/>\n        And <i>they\'re</i> like, it\'s better than yours\n      `\n' +
                  '    }\n' +
                  '  },\n' +
                  '  computed: {\n' +
                  '    dirtyMessage() {\n' +
                  '      return this.message\n' +
                  '    },\n' +
                  '    cleanMessage() {\n' +
                  '      return this.$sanitize(this.message)\n' +
                  '    }\n' +
                  '  }\n' +
                  ' }\n' +
                  '</script>',
            errors: [
                {
                    message: "'v-html' directive can lead to XSS attack! You must sanitize!!",
                    line: 2
                }
            ]
        }
    ]
})