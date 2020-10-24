<template>
    <div>
        <el-dialog class="aiCloud-dialog aioc-map wow rollIn"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   :width="clientWidth+'px'"
                   title="从地图上选择想要查看政策的区域"
                   :before-close="close">
            <div>
                <div id="main" class="talentMap" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px'"></div>
            </div>
            <el-button v-show="currentType != '0'" class="mbi-10" type="primary" @click="back">返回上级地图</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Aiocmap",
        mounted() {
            this.clientWidth = document.body.clientWidth * 0.8;
            this.clientHeight = document.body.clientHeight * 0.7;
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            /**
             * 返回
             */
            back() {
                if(this.currentType == "2") {
                    this.currentType = "1";
                    this.renderMap(this.upLevelName, this.cities);
                } else {
                    this.currentType = "0";
                    this.renderMap("中国", this.provinces);
                }
            },

            initMapChart() {
                this.$nextTick(() => {
                    this.mapChart = this.$echarts.init(document.getElementById("main"));
                    // 直辖市和特别行政区-只有二级地图，没有三级地图
                    // var special = ['北京', '天津', '上海', '重庆', '香港', '澳门']
                    var _that = this
                    this.$.getJSON(_that.$aiocUrl.china, function (data) {
                        console.log(data)
                        _that.provinces = [];
                        for (var i = 0; i < data.features.length; i++) {
                            var provinceName = data.features[i].properties.name;
                            var province = {
                                name: provinceName,
                                cp: data.features[i].properties.cp,
                            };
                            // for (var key in _that.talentData.province) {
                            //     if (key == provinceName) {
                            //         province.value = _that.talentData.province[key];
                            //     }
                            // }
                            _that.provinces.push(province);
                            _that.provinceMap[data.features[i].properties.name] = data.features[i].properties.id;
                        }
                        _that.$echarts.registerMap('中国', data)
                        _that.renderMap('中国', _that.provinces)
                    });
                    /**
                     * 点击事件内是闭包的
                     */
                    this.mapChart.on('click', function (params) {
                        if (params.name in _that.provinceMap) {
                            _that.currentType = "1";
                            _that.upLevelName = params.name;
                            // 如果点击的是34个省、直辖市、自治区，绘制选中地区的二级地图
                            _that.$.getJSON(
                                _that.$aiocUrl.geometryProvince + _that.provinceMap[params.name] + '.json',
                                function (data) {
                                    _that.cityMap = {};
                                    _that.$echarts.registerMap(params.name, data)
                                    _that.cities = []
                                    for (var i = 0; i < data.features.length; i++) {
                                        var cityName = data.features[i].properties.name;
                                        var city = {
                                            name: cityName,
                                            cp: data.features[i].properties.cp,
                                        };
                                        // for(var key in _that.talentData.city) {
                                        //     if(key == cityName) {
                                        //         city.value = _that.talentData.city[key];
                                        //     }
                                        // }
                                        _that.cities.push(city);
                                        _that.cityMap[data.features[i].properties.name] = data.features[i].properties.id;
                                    }
                                    _that.renderMap(params.name, _that.cities)
                                }
                            )
                        } else {
                            // 显示市、地级市、县级、区级地图
                            if(_that.cityMap[params.name] != undefined) {
                                _that.$axios.get(
                                    _that.$aiocUrl.geometryCouties + _that.cityMap[params.name] + '00.json',
                                    {
                                        header: {
                                            'Content-Type': 'application/json;charset=UTF-8',
                                        }
                                    }
                                )
                                    .then(response => {
                                        let data = response.data;
                                        _that.currentType = "2";
                                        _that.countyMap = {};
                                        _that.$echarts.registerMap(params.name, data)
                                        var countyNames = []
                                        for (var i = 0; i < data.features.length; i++) {
                                            countyNames.push({
                                                name: data.features[i].properties.name,
                                                cp: data.features[i].properties.cp,
                                            });
                                            _that.countyMap[data.features[i].properties.name] = data.features[i].properties.id;
                                        }
                                        _that.renderMap(params.name, countyNames)
                                    })
                                    .catch(() => {
                                    });
                            }
                        }
                    })
                });
            },
            renderMap (map, data) {
                this.option.title.subtext = map;
                this.option.geo = {
                    show: true,
                    map: map,
                    zoom: 1, //当前视角的缩放比例
                    roam: true, //是否开启平游或缩放
                    scaleLimit: { //滚轮缩放的极限控制
                        min: 1,
                        max: 2
                    },
                    label: {
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13,
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#2060ff',
                            borderColor: '#20a0ff'
                        },
                        emphasis: {
                            // areaColor: 'green',
                            // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 1, color: '#41e4ff',
                                }, {
                                    offset: 0, color: '#0000ff',
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            borderColor: '#40c060'
                        }
                    }
                };

                this.option.series = [
                    {
                        name: '人才数量',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: this.convertData(data),
                        symbolSize: function (val) {
                            return val[2];
                        },
                        showEffectOn: 'emphasis',
                        rippleEffect: { brushType: 'stroke' },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 13
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 13
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: '#ff00a0'
                                    }, {
                                        offset: 1, color: '#ffa0c0'
                                    }],
                                    globalCoord: false
                                },
                            }
                        }
                    }
                ];
                //在渲染之前重置chart，取消状态即可
                this.mapChart.dispatchAction({
                    type: 'restore'
                });
                this.mapChart.setOption(this.option);
            },
            convertData(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var cp = data[i].cp;
                    var value = data[i].value;
                    if (cp) {
                        if(value) {
                            res.push({
                                name: data[i].name,
                                value: cp.concat(12),
                                num: value,
                            });
                        } else {
                            res.push({
                                name: data[i].name,
                                value: cp.concat(0),
                            });
                        }
                    }
                }
                return res;
            },
        },
        data() {
            return {
                dialogVisible: false,
                clientWidth: 1849,
                clientHeight: 0,
                currentType: "0",
                upLevelName: "",
                provinces : [],
                cities : [],
                provinceMap : {},
                cityMap : {},
                countyMap : {},
                mapChart : "",
                option : {
                    backgroundColor: '#ffffff',
                    title: {
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 'normal',
                            fontFamily: 'Microsoft YaHei'
                        },
                        subtextStyle: {
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '550',
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    tooltip: {
                        enterable:true,
                        trigger: 'item',
                        formatter:  function (params) {
                            if(params.data.num) {
                                return params.data.name + "人才数量 : " + params.data.num;
                            }
                        },
                    },
                    // tooltip: {
                    //   trigger: 'item',
                    //   confine: true,
                    //   position: function (point, params, dom) {
                    //     var width = $(dom).width();     //获取tooltip原来的width
                    //     var m = $("#mapStoreClass");    //获取我们自定义模拟的tooltip dom
                    //     $(dom).css("position", "initial");    //将原来的tooltip设置为initial *重要，为了不让原来的tooltip dom乱跑
                    //     $(m).html(dom);                      //将更改好的dom放入我们模拟的tooltip dom
                    //     $(m).css("left", point[0] + 20);        //设置模拟dom显示位置，此为鼠标位置
                    //     $(m).css("top", point[1] + 20);         //设置模拟dom显示位置，此为鼠标位置
                    //     $(m).css("width", width + 15);          //设置模拟dom宽度
                    //   }
                    // },
                    //设置背景为透明色
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                },
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }
</style>

<style>
    @media screen and (min-width: 1529px) {
        .aioc-map .el-dialog__body {
            padding: 0px;
        }
    }
</style>