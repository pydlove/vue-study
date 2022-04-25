<template>
    <!--eslint-disable-->
    <div class="nd-wehost">
        <!--<van-empty image="search" :description="$t('message.underConstruction')"/>-->

        <div style="font-size: 16px; font-weight: 600; line-height: 28px;">
            CHASE 数据介绍
        </div>

        <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px;">
            CHASE/HIS的观测模式有两种：光谱扫描模式（RSM）和连续谱成像模式（CIM）。卫星原始数据由中国境内的密云、喀什和三亚台站接收，通过专线网络进入南京大学太阳科学数据中心（SSDC-NJU）做科学标定处理。原则上CHASE科学与应用系统只对用户提供一级科学数据（Level 1），如需更高级别的数据产品，可联系我们获取相关数据。
        </div>

        <div style="margin-top: 20px;margin-bottom: 20px;">
            <el-image
                    class="nd-picture"
                    :src="require('./img/p1.jpg')"
                    fit="contain"></el-image>
            <div style="font-size: 14px; line-height: 24px;margin-top: 20px;">
                CHASE/HIS科学数据处理流程
            </div>
        </div>

        <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; color: red;">
            RSM一级科学数据通常以FITS文件格式进行保存，如：RSM20211024T005149_0001_HA.fits， RSM20211024T005149_0001_FE.fits，数据存储类型为无符号整型。 同一扫描序列数据包含Hα线和Fe I线两个观测窗口，分别在文件名中以“HA”和“FE”进行区分。一次扫描序列的两个fits文件均为三维数组，由空间维、波长维、扫描步数构成，数据信息包括日心坐标、太阳的观测半径、坐标旋转参数等可在fits头文件中获取，用户可根据参数旋转太阳像至Heliographic坐标系统。光谱扫描观测还可分为一般模式和binning模式，binning模式下数据在三个维度均做了bin=2的处理，以减少数据存储量。基于RSM一级数据，我们可以计算多普勒速度场，进行绝对辐射定标等等以生成更高级别的数据产品，用户如若需要，可联系我们获取。
        </div>

        <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; color: red;">
            CIM一级科学数据同样以FITS文件格式存储，观测波段为6689 Å拍摄太阳光球图像，文件名如CIM20211020T084117.fits。和RSM数据不同，CIM在预处理中已旋转图像至Heliographic坐标系统，因此INST_ROT始终为0。
        </div>

        <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; color: red;margin-top: 20px;">
            RSM和CIM两种观测模式的相关参数见下表：
        </div>

        <div style="margin-bottom: 10px;">
            <el-image
                    class="nd-picture"
                    :src="require('./img/p2.jpg')"
                    fit="contain"></el-image>
        </div>

        <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; color: red;margin-top: 20px;">
            RSM一级数据FITS文件头文件说明：
        </div>

        <div style="margin-top: 10px;">
            <el-image
                    class="nd-picture"
                    :src="require('./img/p3.jpg')"
                    fit="contain"></el-image>
            <el-image
                    class="nd-picture"
                    :src="require('./img/p4.jpg')"
                    fit="contain"></el-image>
        </div>

        <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; color: red;margin-top: 20px;">
            CIM一级数据FITS头文件说明：
        </div>
        <div style="margin-top: 10px;">
            <el-image
                    class="nd-picture"
                    :src="require('./img/p5.jpg')"
                    fit="contain"></el-image>
            <el-image
                    class="nd-picture"
                    :src="require('./img/p6.jpg')"
                    fit="contain"></el-image>
        </div>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "DataProduct",
    }
</script>

<style scoped>

</style>