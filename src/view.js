Vue.component('apodvue',{
	props: ['url'],
	template: `<img id="apodimg" style="width:100%;" v-bind:src="url" alt="Error Retrieving Current APOD">`
})

Vue.component('hubblevue',{
	props: ['url'],
	template: `<img id="hubbleimg" style="width:100%;" v-bind:src="'https:'+url" alt="Error Retrieving Current Hubble Photo">`
})

Vue.component('epicvue',{
	props: ['epics', 'incrementor'],
	//template: `<ul><li v-for="object in epics"><img style="width:15%;" v-bind:src="'https://epic.gsfc.nasa.gov/archive/natural/2019/06/27/png/'+object.image+'.png'">{{object.caption}}</li></ul>`
	template: `<img id="epicimg" style="width:100%;" v-bind:src="'https://epic.gsfc.nasa.gov/archive/natural/2019/06/27/png/'+epics[incrementor].image+'.png'" alt="Error Retrieving Current EPICPhoto"> `
	//template: `<ul><li v-for="object in epics"><img style="width:400px;" v-bind:src="'https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/png/'+object[0].image+'.png'"></li></ul>`
})

// register modal component
Vue.component('modal', {
	template: '#modal-template'
})

// foreach 
Vue.component('datasettable', {
	props: ['dataset','datasetday','datastate'],
	template: "<table id='datasetTable'><tr is='datalist-list-row' v-for='(object1,index) in dataset' v-bind:datatitle='object1[index].title' v-bind:index='index' v-bind:data='object1' ></tr></table>"
})

Vue.component('datalist-list-row',{
	props: ['data','datatitle'],
	//template: `<tr v-for='object in data'><input type='text' v-bind:value="data" value='value'></tr>`
	template: `<div><td v-for='object in data'> <tr>{{object.title}}</tr>{{object.data}}</td></div>`
})

Vue.component('addData',{
	template: `<input type='text' value='Title'><input type='text' value='New Notes'>`
})

// foreach dropdown
Vue.component('daynotesets',{
	props: ['data'],
	template: `<select> <option v-for="object in data" value="object.date">{{object.date}}</option></select>`
})