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
            code: 
`<template>
  <div v-html="$sanitize(cleanMessage)"></div>
</template>

<script>
 export default {
  data () {
    return {
      message:\`
        My <strong>milkshake</strong> brings all the boys to the yard<br/>
        And <i>they're</i> like, it's better than yours
      \`
    }
  },
  computed: {
    cleanMessage() {
      return this.$sanitize(this.message)
    }
  }
 }
</script>`
        },
        {
            filename: 'test.vue',
            code: 
`<template>
  <div v-html="$sanitize(dirtyMessage)"></div>
</template>

<script>
 export default {
  data () {
    return {
      message:\`
        My <strong>milkshake</strong> brings all the boys to the yard<br/>
        And <i>they're</i> like, it's better than yours
      \`
    }
  },
  computed: {
    dirtyMessage() {
      return this.message
    }
  }
 }
</script>`
        },
        {
            filename: 'test.vue',
            code: 
`<template>
  <div v-html="$sanitize(dirtyMessage)"></div>
  <div v-html="cleanMessage"></div>
</template>

<script>
 export default {
  data () {
    return {
      message:\`
        My <strong>milkshake</strong> brings all the boys to the yard<br/>
        And <i>they're</i> like, it's better than yours
      \`
    }
  },
  computed: {
    dirtyMessage() {
      return this.message
    },
    cleanMessage() {
      return this.$sanitize(this.message)
    }
  }
 }
</script>`
        },
        {
            filename: 'test.vue',
            code: 
`<template>
  <div v-html="$sanitize(message)"></div>
  <div v-html="cleanMessage"></div>
</template>

<script>
 export default {
  data () {
    return {
      message:\`
        My <strong>milkshake</strong> brings all the boys to the yard<br/>
        And <i>they're</i> like, it's better than yours
      \`
    }
  },
  computed: {
    dirtyMessage() {
      return this.message
    },
    cleanMessage() {
      return this.$sanitize(this.message)
    }
  }
 }
</script>`,
        }, {
            filename: 'test.vue',
            code: '',
        }, {
            filename: 'test.vue',
            code: '<template></template>',
        }, {
            filename: 'test.vue',
            code: '<template><div></div></template>',
        }
    ],
    invalid: [
        {
            filename: 'test.vue',
            code: 
`<template>
  <div v-html="dirtyMessage"></div>
  <div v-html="cleanMessage"></div>
</template>

<script>
 export default {
  data () {
    return {
      message:\`
        My <strong>milkshake</strong> brings all the boys to the yard<br/>
        And <i>they're</i> like, it's better than yours
      \`
    }
  },
  computed: {
    dirtyMessage() {
      return this.message
    },
    cleanMessage() {
      return this.$sanitize(this.message)
    }
  }
 }
</script>`,
            output: 
`<template>
  <div v-html="dirtyMessage"></div>
  <div v-html="cleanMessage"></div>
</template>

<script>
 export default {
  data () {
    return {
      message:\`
        My <strong>milkshake</strong> brings all the boys to the yard<br/>
        And <i>they're</i> like, it's better than yours
      \`
    }
  },
  computed: {
    dirtyMessage() {
      return this.message
    },
    cleanMessage() {
      return this.$sanitize(this.message)
    }
  }
 }
</script>`,
            errors: [
                {
                    message: "'v-html' directive can lead to XSS attack! You must sanitize!!",
                    line: 2
                }
            ]
        }
    ]
})