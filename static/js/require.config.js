//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'static/js',
    paths: {
        "underscore": 'third-party/underscore-min',
        
        //angular
        "angular":          "../angular/angular",
        "angular-route":    "lib/angular-route-1.4.4",
        "angular-resource": "lib/angular-resource-1.4.4",
        "angular-sanitize": "lib/angular-sanitize-1.4.4",
        "angularAMD":       "lib/angularAMD.min",
        "angular-ui":       "lib/ui-bootstrap-tpls-1.3.3.min",
        
        
        "moment":               "third-party/moment",
        
        //page plugins
		"prettify":             "../bemat-admin/vendor/google-code-prettify/prettify",
		"perfect-scrollbar":    "../bemat-admin/vendor/perfectscrollbar/perfect-scrollbar.jquery.min",
		"icheck":               "../bemat-admin/vendor/iCheck/icheck.min",
		"bootstrap-select":     "../bemat-admin/vendor/bootstrap-select/bootstrap-select.min",
		"datatables.net":       "../bemat-admin/vendor/DataTables/js/jquery.dataTables.min",
		"bootstrap_dataTables": "../bemat-admin/vendor/DataTables/js/dataTables.bootstrap.min",
		"jquery_fullscreen":    "../bemat-admin/vendor/fullscreen/jquery.fullscreen-min",
		
		"fullcalendar":         "../bemat-admin/vendor/fullcalendar/fullcalendar.min",
		"sparkline":            "../bemat-admin/vendor/sparkline/jquery.sparkline.min",
		"peity":                "../bemat-admin/vendor/peity/jquery.peity.min",
		"chartist":             "../bemat-admin/vendor/chartist/chartist.min",
		"summernote":           "../bemat-admin/vendor/summernote/summernote.min",
		"ckeditor":             "../bemat-admin/vendor/ckeditor/ckeditor",
		"wysihtml5":            "../bemat-admin/vendor/wysihtml5/bootstrap3-wysihtml5.all.min",
		
		//cerocreative plugins
		"materialRipple":   "../bemat-admin/vendor/materialRipple/jquery.materialRipple",
		"snackbar":         "../bemat-admin/vendor/snackbar/jquery.snackbar",
		"toasts":           "../bemat-admin/vendor/toasts/jquery.toasts",
		"speedDial":        "../bemat-admin/vendor/speedDial/jquery.speedDial",
		"circularProgress": "../bemat-admin/vendor/circularProgress/jquery.circularProgress",
		"linearProgress":   "../bemat-admin/vendor/linearProgress/jquery.linearProgress",
		"subheader":        "../bemat-admin/vendor/subheader/jquery.subheader",
		"simplePieChart":   "lib/jquery.simplePieChart",//"../components/bemat-adminvendor/simplePieChart/jquery.simplePieChart",
		
		//d3 plugins
		"d3": "../bemat-admin/vendor/d3/d3.v3",
		"nvd3": "../bemat-admin/vendor/nvd3/nv.d3",
		
		//bemat
		"bemat-common":        "../bemat-admin/js/bemat-admin-common",
		"bemat-demo":          "../bemat-admin/js/bemat-admin-demo",
		"bemat-demo-chartist": "../bemat-admin/js/bemat-admin-demo-chartist",
		"bemat-demo-dashboard":"../bemat-admin/js/bemat-admin-demo-dashboard",
        
		//core deps
        'jquery':    "lib/jquery-1.12.3.min",
		'jquery-ui': "lib/jquery-ui.min",
		'bootstrap': "lib/bootstrap.min",
		'modernizr': "lib/modernizr-2.6.2-respond-1.1.0.min",
		
		//directives
		'timeseries': "angular-lib/timeseries",
		"toggleable-element": "angular-lib/toggleable-element",
		'value-card':"angular-lib/value-card",
		'dial':"angular-lib/dial",
		
		
		//app
		"dashboard": "../brewery/js/dashboard",
        "brewhouse": "../brewery/js/brewhouse",
        "recipes": "../brewery/js/recipes",
        
        //api
        "brewery-api": "../brewery/js/api",
		
    },
    shim : {
        "bootstrap" :       { "deps" :['jquery-ui'] },
        "angularAMD":       ['angular'],
        "angular-route":    ['angular'],
        "angular-resource": ['angular'],
        "angular-sanitize": ['angular'],
        "angular-ui":       ['angular'],
        
        //jquery plugins
        "perfect-scrollbar": {"deps":['jquery-ui']},
        "icheck": {"deps":['jquery-ui']},
        "jquery_fullscreen": {"deps":['jquery-ui']},
        "peity": {"deps":['jquery-ui']},
        "materialRipple": {"deps":['jquery-ui']},
        "snackbar": {"deps":['jquery-ui']},
        "wysihtml5": {"deps":['jquery-ui']},
        "toasts": {"deps":['jquery-ui']},
        "speedDial": {"deps":['jquery-ui']},
        "circularProgress": {"deps":['jquery-ui']},
        "linearProgress": {"deps":['jquery-ui']},
        "subheader": {"deps":['jquery-ui']},
        "simplePieChart": {"deps":['jquery-ui']},
        "jquery-ui": {"deps":['jquery']},
        
        //bootstrap plugins
        //"bootstrap-select": {"deps":["bootstrap",'jquery']},
        //"bootstrap_dataTables": {"deps":["bootstrap"]},
        "wysihtml5": {"deps":["bootstrap",'jquery']},
        
        "nvd3":{"deps":['d3']},
        
        //bemat reqs
        "bemat-common": {
        	"deps":['perfect-scrollbar','bootstrap-select',
        	        "jquery","jquery-ui","bootstrap","modernizr",
                    "icheck","materialRipple","speedDial",
                    "circularProgress","linearProgress","subheader",
                    "snackbar","toasts","simplePieChart","jquery_fullscreen"]
        },
        "bemat-demo": {"deps":['bemat-common','jquery']},
        "bemat-demo-chartist": {"deps":['bemat-common','jquery']},
        "bemat-demo-dashboard": {"deps":['bemat-common','jquery']},
        
    },
    deps: ['app']
});