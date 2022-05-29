<template>
    <!--eslint-disable-->
   <div>
       <div v-if="language == 'zh'" class="nd-wehost">
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

           <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; ">
               RSM一级科学数据通常以FITS文件格式进行保存，如：RSM20211024T005149_0001_HA.fits， RSM20211024T005149_0001_FE.fits，数据存储类型为无符号整型。 同一扫描序列数据包含Hα线和Fe I线两个观测窗口，分别在文件名中以“HA”和“FE”进行区分。一次扫描序列的两个fits文件均为三维数组，由空间维、波长维、扫描步数构成，数据信息包括日心坐标、太阳的观测半径、坐标旋转参数等可在fits头文件中获取，用户可根据参数旋转太阳像至Heliographic坐标系统。光谱扫描观测还可分为一般模式和binning模式，binning模式下数据在三个维度均做了bin=2的处理，以减少数据存储量。基于RSM一级数据，我们可以计算多普勒速度场，进行绝对辐射定标等等以生成更高级别的数据产品，用户如若需要，可联系我们获取。
           </div>

           <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; ">
               CIM一级科学数据同样以FITS文件格式存储，观测波段为6689 Å拍摄太阳光球图像，文件名如CIM20211020T084117.fits。和RSM数据不同，CIM在预处理中已旋转图像至Heliographic坐标系统，因此INST_ROT始终为0。
           </div>

           <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; margin-top: 20px;">
               RSM和CIM两种观测模式的相关参数见下表：
           </div>

           <div style="margin-bottom: 10px;">
               <el-image
                       class="nd-picture"
                       :src="require('./img/p2.jpg')"
                       fit="contain"></el-image>
           </div>

           <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; margin-top: 20px;">
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

           <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; margin-top: 20px;">
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

       <div v-if="language == 'en'">
           <div style="font-size: 16px; font-weight: 600; line-height: 28px;">
               Introduction to the CHASE data
           </div>

           <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px;">
               The CHASE/HIS has two observation mode: the raster scanning mode (RSM) and the continuum imaging mode (CIM). The raw data of the CHASE/HIS are transmitted to three ground stations (Miyun, Kashi, and Sanya) located in China, and transferred to the Solar Science Data Center of Nanjing University (SSDC-NJU) via a dedicated internet access. The Level 1 science data are available to the community througth the website. For higher-level products, users are encouraged to develop their own routines, or contact us for asistance if needed.
           </div>

           <div style="margin-top: 20px;margin-bottom: 20px;">
               <el-image
                       class="nd-picture" style="width: 343px;height: 688px;"
                       :src="require('./img/e1.png')"
                       fit="contain"></el-image>
               <div style="font-size: 14px; line-height: 24px;margin-top: 20px;">
                   The data calibration flow diagram for the CHASE/HIS
               </div>
           </div>

           <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; ">
               The RSM level 1 data are saved in FITS formatted files, such as RSM20211024T005149_0001_HA.fits and RSM20211024T005149_0001_FE.fits. The data of a scanning sequence are archived as two 3-dimensional FITS files for the Hα and Fe I passbands. The three dimensions refer to the pixels along the slit, scanning steps, and the pixels along the wavelength, respectively. The data information can be found in the FITS headers. There are two types of RSM level 1 data, namely normal and binning. The binning type cuts down pixel resolutions with bin=2 in all three dimensions of the FITS file.
           </div>

           <div style="text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; ">
               The CIM level 1 data are stored in FITS file format as well, such as CIM20211020T084117.fits, Unlike the RSM, the CIM images have been transformed to the Heliographic coordinate in the processing pipeline, so the keyword “INST_ROT” is always set to 0.
           </div>

           <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; margin-top: 20px;">
               The parameters of RSM and CIM level 1 data
           </div>

           <div style="margin-bottom: 10px;">
               <el-image style="width: 460px;height: 447px;"
                       class="nd-picture"
                       :src="require('./img/e2.jpg')"
                       fit="contain"></el-image>
           </div>

           <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; margin-top: 20px;">
               The headers of RSM level 1 FITS file
           </div>

           <div style="margin-top: 10px;">
               <el-image style="width: 460px"
                       class="nd-picture"
                       :src="require('./img/e3.jpg')"
                       fit="contain"></el-image>
               <el-image style="width: 460px"
                       class="nd-picture"
                       :src="require('./img/e4.jpg')"
                       fit="contain"></el-image>
           </div>

           <div style="margin-left: 62px;text-indent: 28px; text-align: left;font-size: 14px; line-height: 24px; margin-top: 20px;">
               The headers of CIM level 1 FITS file
           </div>
           <div style="margin-top: 10px;">
               <el-image style="width: 460px;"
                       class="nd-picture"
                       :src="require('./img/e5.jpg')"
                       fit="contain"></el-image>
               <el-image style="width: 460px"
                       class="nd-picture"
                       :src="require('./img/e6.jpg')"
                       fit="contain"></el-image>
               <el-image style="width: 460px;"
                       class="nd-picture"
                       :src="require('./img/e7.jpg')"
                       fit="contain"></el-image>
           </div>
       </div>
   </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "DataProduct",
        data() {
            return {
                language: "",
            }
        },
        mounted() {
            this.initLanguage();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },
        }
    }
</script>

<style scoped>

</style>