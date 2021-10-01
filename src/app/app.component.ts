import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins from "@amcharts/amcharts4/plugins/sunburst";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Country } from './services/model/country';
import { RestManager } from './services/rest.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	currentlySelected?: object;
	india?: Country;
	nepal?: Country;
	bangladesh?: Country;
	pakistan?: Country;
	bhutan?: Country;
	sriLanka?: Country;
	maldives?: Country;
	totalCases: number = 0;
	totalIndiaCases: number = 0;
	totalNepalCases: number = 0;
	totalBangladeshCases: number = 0;
	totalPakistanCases: number = 0;
	totalBhutanCases: number = 0;
	totalSriLankaCases: number = 0;
	totalMaldivesCases: number = 0;


	constructor(private restManager: RestManager) {
		am4core.useTheme(am4themes_animated);
	}

	ngOnInit() {
		let apis = [
			this.restManager.getIndiaCovidDetails(),
			this.restManager.getNepalCovidDetails(),
			this.restManager.getBangladeshCovidDetails(),
			this.restManager.getPakistanCovidDetails(),
			this.restManager.getBhutanCovidDetails(),
			this.restManager.getSriLankaCovidDetails(),
			this.restManager.getMaldivesCovidDetails(),
		];

		forkJoin(apis).subscribe((data: Array<any>) => {
			this.india = data[0].data;
			this.nepal = data[1].data;
			this.bangladesh = data[2].data;
			this.pakistan = data[3].data;
			this.bhutan = data[4].data;
			this.sriLanka = data[5].data;
			this.maldives = data[6].data;

			if (this.india?.confirmed && this.india?.deaths && this.india?.recovered) {
				this.totalIndiaCases = this.india?.confirmed + this.india?.deaths + this.india?.recovered;
			}
			if (this.nepal?.confirmed && this.nepal?.deaths && this.nepal?.recovered) {
				this.totalNepalCases = this.nepal?.confirmed + this.nepal?.deaths + this.nepal?.recovered;
			}
			if (this.bangladesh?.confirmed && this.bangladesh?.deaths && this.bangladesh?.recovered) {
				this.totalBangladeshCases = this.bangladesh?.confirmed + this.bangladesh?.deaths + this.bangladesh?.recovered;
			}
			if (this.pakistan?.confirmed && this.pakistan?.deaths && this.pakistan?.recovered) {
				this.totalPakistanCases = this.pakistan?.confirmed + this.pakistan?.deaths + this.pakistan?.recovered;
			}
			if (this.bhutan?.confirmed && this.bhutan?.deaths && this.bhutan?.recovered) {
				this.totalBhutanCases = this.bhutan?.confirmed + this.bhutan?.deaths + this.bhutan?.recovered;
			}
			if (this.sriLanka?.confirmed && this.sriLanka?.deaths && this.sriLanka?.recovered) {
				this.totalSriLankaCases = this.sriLanka?.confirmed + this.sriLanka?.deaths + this.sriLanka?.recovered;
			}
			if (this.maldives?.confirmed && this.maldives?.deaths && this.maldives?.recovered) {
				this.totalMaldivesCases = this.maldives?.confirmed + this.maldives?.deaths + this.maldives?.recovered;
			}
			this.creatChart();
		});
	}

	creatChart() {
		// Create the chart
		let chart = am4core.create("container", am4plugins.Sunburst);
		chart.width = am4core.percent(100);
		chart.height = am4core.percent(100);
		chart.dataFields.color = "color";
		chart.padding(0, 0, 0, 0);
		chart.colors.step = 2;
		chart.data = [
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.nepal?.country,
						value: this.totalNepalCases,
						children: [
							{ name: "Recovered", value: this.nepal?.recovered },
							{ name: "Deaths", value: this.nepal?.deaths },
							{ name: "Active", value: this.nepal?.confirmed }
						]
					}
				]
			},
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.bangladesh?.country,
						value: this.totalBangladeshCases,
						children: [
							{ name: "Recovered", value: this.bangladesh?.recovered },
							{ name: "Deaths", value: this.bangladesh?.deaths },
							{ name: "Active", value: this.bangladesh?.confirmed }
						]
					}
				]
			},
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.pakistan?.country,
						value: this.totalPakistanCases,
						children: [
							{ name: "Recovered", value: this.pakistan?.recovered },
							{ name: "Deaths", value: this.pakistan?.deaths },
							{ name: "Active", value: this.pakistan?.confirmed }
						]
					}
				]
			},
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.india?.country,
						value: this.totalIndiaCases,
						children: [
							{ name: "Recovered", value: this.india?.recovered },
							{ name: "Deaths", value: this.india?.deaths },
							{ name: "Active", value: this.india?.confirmed }
						]
					}
				]
			},
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.bhutan?.country,
						value: this.totalBhutanCases,
						children: [
							{ name: "Recovered", value: this.bhutan?.recovered },
							{ name: "Deaths", value: this.bhutan?.deaths },
							{ name: "Active", value: this.bhutan?.confirmed }
						]
					}
				]
			},
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.sriLanka?.country,
						value: this.totalSriLankaCases,
						children: [
							{ name: "Recovered", value: this.sriLanka?.recovered },
							{ name: "Deaths", value: this.sriLanka?.deaths },
							{ name: "Active", value: this.sriLanka?.confirmed }
						]
					}
				]
			},
			{
				name: "Total Cases",
				value: this.totalCases,
				children: [
					{
						name: this.maldives?.country,
						value: this.totalMaldivesCases,
						children: [
							{ name: "Recovered", value: this.maldives?.recovered },
							{ name: "Deaths", value: this.maldives?.deaths },
							{ name: "Active", value: this.maldives?.confirmed }
						]
					}
				]
			}
		];


		chart.colors.step = 2;
		chart.fontSize = 11;

		chart.innerRadius = am4core.percent(10);

		// define data fields
		chart.dataFields.value = "value";
		chart.dataFields.name = "name";
		chart.dataFields.children = "children";


		let level0SeriesTemplate = new am4plugins.SunburstSeries();
		chart.seriesTemplates.setKey("0", level0SeriesTemplate)

		// this makes labels to be hidden if they don't fit
		level0SeriesTemplate.labels.template.truncate = true;
		level0SeriesTemplate.labels.template.hideOversized = true;
		level0SeriesTemplate.showOnInit = false;
		level0SeriesTemplate.usePercentHack = false;

		level0SeriesTemplate.radius = am4core.percent(100);
		level0SeriesTemplate.innerRadius = am4core.percent(0);

		let selectedState = level0SeriesTemplate.states.create("selected");
		selectedState.properties.opacity = 0.7;
		level0SeriesTemplate.defaultState.properties.radius = am4core.percent(100);


	}
}
