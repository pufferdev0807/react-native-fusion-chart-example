import ScrollArea2D from'./scrollarea2d';import LineDataset from'../_internal/datasets/line';class ScrollLine2D extends ScrollArea2D{static getName(){return'ScrollLine2D'}constructor(){super(),this.canvasborderthickness=1,this.avgScrollPointWidth=75,this.defaultPlotShadow=1,this.binSize=0}getName(){return'ScrollLine2D'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Scrollable Multi-series Line Chart',a.defaultDatasetType='line',a.zeroplanethickness=1,a.zeroplanealpha=40,a.showzeroplaneontop=0,a.enablemousetracking=!0,a.defaultcrosslinethickness=1}getDSdef(){return LineDataset}getDSGroupdef(){}}export default ScrollLine2D;