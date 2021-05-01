<template>
    <v-form-base
            :model="myModel"
            :schema="mySchema"
            col=12
    />
</template>

<script>
    import vFormBase from '../components/formbase/vFormBase.vue'
    import {mapActions} from 'vuex'
    export default {
        components: { vFormBase},
        data: ()=>({
            myModel: {
                name: 'Stoner',
                position: 'Admin',
                tasks: [
                    {
                        done: true,
                        title: 'make refactoring'
                    },
                    {
                        done: false,
                        title: 'write documentation'
                    },
                    {
                        done: true,
                        title: 'remove logs'
                    }
                ]
            },
            mySchema: {
                name: { comp:'input', label:'Name'},
                position: { comp:'input', label:'Position' },
                tasks: {
                    comp: 'array',
                    col:24,
                    schema: {
                        done:{ comp:'checkbox', col:2},
                        title:{ comp:'input', clearable:true, col:22 }
                    }
                },
                btn:{comp:'button',text:'generated button'}

            }
        }),
        methods:{
            ...mapActions(['schemaConverterInc']),
          /*  getJSON(){
                this.mySchema = this.schemaConverterInc()
            }*/
        },
        beforeMount() {
           // this.getJSON()
        }
    }
</script>

<style scoped>

</style>
