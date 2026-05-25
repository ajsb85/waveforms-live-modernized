import { AfterViewInit, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

declare const $: any;

export type DataContainer = any;
export type Chart = any;

@Component({
    standalone: false,
  selector: 'digilent-chart',
  template: '<div class="digilent-chart-host" [id]="chartId"></div>'
})
export class DigilentChart implements AfterViewInit {
  @Output() chartLoad: EventEmitter<void> = new EventEmitter<void>();
  @Input() chartId?: string;
  @Input() flotOptions?: any;
  @Input() chartType?: string;

  digilentChart: any;
  public initialChartLoad = true;

  ngAfterViewInit(): void {
    const plotArea = $(`#${this.chartId}`);
    plotArea.css({
      width: '100%',
      height: '100%'
    });

    if (this.digilentChart == null) {
      this.createChart();
    }
  }

  createChart(data?: any): void {
    const chartData = data == null ? [] : data;
    if (this.chartId == null || this.flotOptions == null || typeof $?.plot !== 'function') {
      window.setTimeout(() => this.createChart(chartData), 200);
      return;
    }

    this.digilentChart = $.plot(`#${this.chartId}`, chartData, this.flotOptions);
    this.setNearestPresetSecPerDivVal();

    if (this.initialChartLoad) {
      this.initialChartLoad = false;
      this.chartLoad.emit();
    }
  }

  setData(dataToDraw: any, autoscale?: boolean): void {
    if (autoscale || this.digilentChart == null) {
      this.createChart(dataToDraw);
      return;
    }

    this.digilentChart.setData(dataToDraw);
    this.digilentChart.setupGrid();
    this.digilentChart.draw();
    this.setNearestPresetSecPerDivVal();
  }

  refreshChart(dataToDraw: any): void {
    this.createChart(dataToDraw);
    this.setNearestPresetSecPerDivVal();
  }

  public setNearestPresetSecPerDivVal(): void {
    if (this.flotOptions?.zoomPan == null || this.digilentChart == null) {
      return;
    }

    const axes = this.digilentChart.getAxes();
    const newSecPerDivVal = (axes.xaxis.max - axes.xaxis.min) / 10;
    const secsPerDivArray = this.digilentChart.getSecsPerDivArray?.() ?? [];
    let count = 0;

    while (secsPerDivArray[count] < newSecPerDivVal && count < secsPerDivArray.length) {
      count++;
    }

    this.digilentChart.setActiveXIndex?.(count);
  }
}

@NgModule({
  declarations: [DigilentChart],
  exports: [DigilentChart]
})
export class DigilentChartModule {}
