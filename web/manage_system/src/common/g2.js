import G2 from '@antv/g2';

const myTheme = G2.Util.deepMix({
    plotCfg: {
        padding: 'auto', // 默认边框
    },
    tooltip: {
        "g2-tooltip": {
            fontSize: '14px',
            lineHeight: '24px',
        },
    },
    axis: {
        bottom: {
            label: {
                textStyle: {
                    fontSize: 14,
                }
            }
        },
        left: {
            label: {
                textStyle: {
                    fontSize: 14,
                }
            }
        }
    }
}, G2.Theme);
G2.Global.setTheme(myTheme);
export default G2;
