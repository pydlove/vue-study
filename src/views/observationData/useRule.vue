<template>
    <!--eslint-disable-->
        <div class="userule">
            1.Users should acknowledge the sources of data used in publications, presentations, and reports. “We
            acknowledge the CNSA CHASE mission and the HIS science team for use of data.” Or “This work uses the data
            from the CHASE mission funded by China National Space Administration.”
            <div class="userule">
                2.Users are encouraged to provide the CHASE/HIS science team (email: lic@nju.edu.cn) a copy of
                manuscript upon submission or published paper that uses the data of CHASE/HIS.
            </div>
            <div class="userule">
                3.Users are encouraged to cite the papers when using the data of CHASE/HIS.
                “Li Chuan, Fang Cheng, Ding Mingde, et al. The Hα Imaging Spectrograph for the CHASE Mission, to be
                submitted” or “Li Chuan, Fang Cheng, Li Zhen, et al. Chinese Hα Solar Explorer (CHASE) – a complementary
                space mission to the ASO-S, 2019, Res. Astron. Astrophys., 19, 165, doi: 10.1088/1674–4527/19/11/165”
            </div>
            <div class="userule">
                4.The use of CHASE images and movies for non-commercial purposes and public education is strongly
                encouraged in case of attributing the source of images and movies as “Courtesy of CNSA/CHASE and the HIS
                science team.”
            </div>
            <div class="userule">
                5.Any questions about accessing the most recent available data and analysis routines, please consult
                with the CHASE/HIS science team (email: lic@nju.edu.cn).
            </div>
        </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "useRule"
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .useRuleTitle{
            font-size: 20px;
            margin: 10px;
            text-align: left;
        }
        .userule {
            margin-top: 10px;
            font-size: 16px;
            line-height: 30px;
            text-align: left;
        }
    }
</style>