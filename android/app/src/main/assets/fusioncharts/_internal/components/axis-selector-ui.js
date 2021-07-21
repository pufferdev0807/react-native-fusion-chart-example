import ComponentInterface from'../../core/component-interface';import{componentFactory,TRACKER_FILL,toRaphaelColor,hasTouch}from'../lib/lib';import NumericAxis from'../axis/numeric';import Map from'core-js/fn/map';let BLANKSTRING='',swap=(c,a,b)=>{let d=[c,b.get(c)],e=[a,b.get(a)],f=Array.from(b.entries()),g=f.map(([b,f])=>b===c?e:b===a?d:[b,f]);return new Map(g)},factoryAxis=function(a){let b,c,d,e,f=a.config.axesConf,g=a.config.axisMapById,h=g&&Array.from(g.keys())||[],i=!0,j=a.getFromEnv('chart').getChildren('canvas')[0],k=j.getChildren('axisRefVisualCartesian')[0],l=()=>k.asyncDraw(),m=function(a){let b=h.indexOf(a);-1!==b&&h.splice(b,1)};componentFactory(a,NumericAxis,'yAxis',f.length,f),b=(a.getChildren('yAxis')||[]).slice(0),c=a.config.axisMapById=new Map,('l'===a.config.side?b.reverse():b).forEach(b=>{if(!(b.getState('removed')||0===b.config.showaxis)){let f=b.getId();e={},e.axis=b,c.set(f,e),0===b.config.showaxis?b.hide():b.show(),j.attachAxis(b,!0),i&&(a.config.besideCanvas=f),i=!1,axisCount||(d=b),b.setLinkedItem('canvas',j),k.setLinkedItem(b.getId(),b),k.addExtEventListener('visiblerangeset',l,b),axisCount++,m(f)}}),d&&j.setPrimaryAxis('yAxis',d),function(a,b){let c,d,e;for(e=a.length-1;-1<e;e--)c=a[e],d=b.get(c),d.checkbox&&d.checkbox.hide(),d.axis&&d.axis.hide(),b['delete'](c)}(h,g)},axisCount=0,cbIdCount=0;class AxisSelectorUI extends ComponentInterface{constructor(){super(),this.registerFactory('axis',factoryAxis)}static resetAxisCount(){axisCount=0}configureAttributes(a={}){let b=this,c=b.config;c.axesConf=a.axesConf||[],c.checkboxesConf=a.checkboxesConf||[],c.side=a.side}placeAxis(a){let b,c=this,d=c.config,e=d.side,f=c.getAxesDetails(),g=c.getFromEnv('chartConfig').axesPadding,h=0,i=0,j={right:0,left:0};return f.forEach(c=>{let d=c.value||(c.value={}),f=c.axis;f.getState('removed')||0===f.config.showaxis||(b=f.placeAxis(.7*a),'r'===e?(a-=d.width=b.right,j.right+=b.right,h+=g):(a-=d.width=b.left,j.left+=b.left,i+=g))}),{dimension:j,rightPadding:h,leftPadding:i}}setAxisDimention(){let a=this,b=a.config,c=a.getAxesDetails(),d=a.getFromEnv('chart'),e=a.getFromEnv('chartConfig').axesPadding,f=d.getChildren('canvas')[0].config,g=f.canvasBorderWidth,h=f.canvasPaddingTop,i=f.canvasPaddingBottom,j=f.canvasLeft,k=f.canvasTop,l=f.canvasHeight,m=j+f.canvasWidth,n='r'===b.side,o='r'===b.side?j-g:m+g,p=0;c.forEach(a=>{let b=a.value||(a.value={}),c=a.axis;0===c.config.showaxis||c.getState('removed')||(b.x=n?m+g+p+e:j-g-p-e,b.y=k+h,b.height=l-h-i,b.opposite=o,p+=b.width+e,c.setAxisDimention({x:b.x,y:b.y,opposite:b.opposite,axisLength:b.height}))})}drawHotElements(){let a,b,c=this,d=c.config,e='r'===d.side,f=c.getFromEnv('chartConfig'),g=f.allowAxisShift,h=c.getFromEnv('chart'),i=c.getFromEnv('paper'),j=h.getChildContainer('trackerGroup'),l=d.axisMapById,m=c.getGraphicalElement('axisHotElement')||[],n=h.getChildren('canvas')[0],o=-1,p={cursor:'col-resize',stroke:TRACKER_FILL,fill:TRACKER_FILL,visibility:!0};for(g&&l.forEach((a,b)=>{let d,f=a.value;p.x=f.x+(e?0:-f.width),p.y=f.y,p.width=f.width,p.height=f.height,(d=m[++o])||(d=c.addGraphicalElement('axisHotElement',i.rect(j),!0),hasTouch?d.touchstart(c._resuffelAxis):d.mousedown(c._resuffelAxis)),d.attr(p).data('axisDetails',{axisSelectorUI:c,canvas:n,axisId:b})}),a=o+1,b=m.length;a<b;a++)c.removeGraphicalElement(m[a])}drawCheckBoxes(){let a=this,b=a.config,c=a.getFromEnv('chartInstance').id,d=a.getFromEnv('chartConfig'),e=d.allowSelection,f=a.getFromEnv('chart'),g=f.getChildContainer('buttonGroup'),h=a.getFromEnv('toolBoxAPI'),i=a.getFromEnv('toolbox'),j=h.CheckboxSymbol,k='r'===b.side,l=b.axisMapById;e&&l.forEach((b,e)=>{let h=b.value,l=b.checkbox,m=b.axis,n=m.config,o='updating',p=k?b.axis.getAxisConfig('axisNamePadding'):-h.width;l||(l=b.checkbox=new j,l.configure(BLANKSTRING,!0,cbIdCount++,i.pId,c),l.config.conf=i.getDefaultConfiguration(),l.attachEventHandlers({click:{fn:function(b,c){a._dolegendInteraction.call(this,b,c),n.checkBoxChecked=!n.checkBoxChecked},args:[e,f]}}),o='appearing'),l.draw(h.x+p,h.y+h.height+4,{parentLayer:g}),a.getFromEnv('animationManager').setAnimation({el:l.config.node,attr:{stroke:toRaphaelColor({color:d.checkBoxColor,alpha:100,"stroke-width":[1,2]})},state:o,component:a}),n.checkBoxChecked?l.check():l.uncheck()})}_createLayers(){let a=this,b=a.getFromEnv('chart'),c=b.getContainer('parentgroup');a.createContainer('axisBottomGroup',{name:'axis-bottom-group'},c),a.createContainer('axisTopGroup',{name:'axis-top-group'},c)}createContainer(a,b,c){let d=this.getFromEnv('animationManager');return this.addChildContainer(a,d.setAnimation({container:c,attr:b,el:this.getChildContainer(a)||'group',component:this,label:'group'}))}draw(){this._createLayers(),this.drawHotElements(),this.drawCheckBoxes()}_resuffelAxis(){var a=this.data('axisDetails'),b=a.axisSelectorUI,c=b.config,d=a.canvas,e=a.axisId,f=b.getAxesDetails();c.besideCanvas!==e&&(f=b.config.axisMapById=swap(c.besideCanvas,e,f)),c.besideCanvas=e,d.setPrimaryAxis('yAxis',f.get(e).axis),b.setAxisDimention(),b.asyncDraw(),d.getChildren('axisRefVisualCartesian')[0].asyncDraw()}_dolegendInteraction(a,b){var c,d,e=this,f=[];for(c in b.iterateComponents(a=>{'dataset'===a.getType()&&f.push(a)}),f)f.hasOwnProperty(c)&&(d=f[c],d.getFromEnv('yAxis').getId()===a&&(!d.getState('visible')&&e.config.checked?(d.config.legendInteractivity=!0,d.show()):d.getState('visible')&&!e.config.checked&&(d.config.legendInteractivity=!0,d.hide())))}manipulateCheckBox(a){var b,c,d,e,f=this,g=a.data,h=g.dataset,j=h.getFromEnv('yAxis').getId(),k=h.getLinkedParent(),l=k.getChildren().dataset,m=g.state,n=!0,o=f.getAxesDetails();if(e=o.get(j))if('hide'===m){for(b=0,c=l.length;b<c;b++)d=l[b],d.getState('visible')&&(n=!1);n&&e.checkbox&&e.checkbox.uncheck()}else e.checkbox&&e.checkbox.check()}getAxesDetails(){return this.config.axisMapById}getType(){return'customAxisUI'}getName(){return'multiAxisSelectorUI'}getAxes(){return Array.from(this.config.axisMapById.values()).map(a=>a.axis)}}export default AxisSelectorUI;