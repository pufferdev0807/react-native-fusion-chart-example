import{_setDefaultConfig}from'./areabase';import RealtimeArea from'./realtimearea';import RealtimeAreaDataset from'../_internal/datasets/realtimearea';import StackManager from'../_internal/datasets/groups/cartesian.stack';class RealtimeStackedArea extends RealtimeArea{static getName(){return'RealtimeStackedArea'}getName(){return'RealtimeStackedArea'}__setDefaultConfig(){super.__setDefaultConfig(),_setDefaultConfig.call(this);let a=this.config;a.defaultDatasetType='realtimearea',a.isstacked=!0,a.enablemousetracking=!0}getDSdef(){return RealtimeAreaDataset}getDSGroupdef(){return StackManager}}export default RealtimeStackedArea;