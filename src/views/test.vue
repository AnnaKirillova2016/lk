<template>
    <v-form-base
            :model="dataSchema"
            :schema="intSchema"
            col=12
    />
</template>

<script>
    import vFormBase from '../components/formbase/vFormBase.vue'
    import {mapActions, mapState} from 'vuex'
    export default {
        components: { vFormBase},
        data: ()=>({
            myModel: {
                anketa_education_level:{
                    anketa_ord:true,
                    anketa_spo:false,
                    anketa_vo: true
                },
            },
            mySchema: {
                anketa_education_level:{
                    comp:'group',
                    col:16,
                    class:'red',
                    header:'Names',
                    bodyStyle:{padding:'12px', backgroundColor:'#fdc'},
                    schema:{
                        nameA: { comp: 'input', placeholder:'A', col:12 },
                        nameB: { comp: 'input', placeholder:'B', col:12 }
                    }
                },
                switches:{
                    comp:'group',
                    col:8,
                    class:'blue',
                    header:'Switches',
                    schema:{
                        switchA: { comp: 'switch', activeText:'A' },
                        switchB: { comp: 'switch', activeText:'B' }
                    }
                },
            }
        }),
        computed:{
          ...mapState(['intSchema','dataSchema'])
        },
        methods:{
            ...mapActions(['schemaConverterInc']),
            async getJSON(){
                await this.schemaConverterInc()

            }
        },
        beforeMount() {
           this.getJSON()
        }
    }
</script>

<style scoped>

</style>
