///START: Extends tests
var Assert = function(condition, failMessage) {
	if	(condition == false) {
		fail(failMessage);
	}
}

var objectToString = function(o){
    var str='';

    for(var p in o){
        if(typeof o[p] == 'string'){
            str+= p + ': ' + o[p]+';';
        }else{
            str+= p + ': { ' + objectToString(o[p]) + ' } ';
        }
    }

    return str;
};

var When_extending_a_class_two_times = function() {
	
	__log("TEST: When_extending_a_class_two_times");
	
	__log("TEST: Creating MyButton");
	var MyButton = com.tns.tests.Button1.extend("MyButton", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	__log("TEST: Calling MyButton ctor");
	var button1 = new MyButton();
	__log("TEST: Calling button1 toString");
	var button1Label = button1.toString();
	button1.setLabel("first button");
	
	__log("TEST: Creating MyButton2 class");
	var MyButton2 = new com.tns.tests.Button1.extend("MyButton", {
		toString : function() {
	  		return "button2";	
	}});
	
	var button2 = new MyButton2();
	button2.setLabel("second button");
	var button2Label = button2.toString();
	
	__log("but1=" + button1Label + ", but2=" + button2Label);
	
	Assert(button1 != button2 && button1Label == "button1" && button2Label == "button2", "FAILED: When_extending_a_class_two_times");
	
	var button1LabelAfterButton2Created = button1.toString();
	Assert(button1 != button2 && button1LabelAfterButton2Created == "button1" && button2Label == "button2", "FAILED: When_extending_a_class_two_times");
}

var When_extending_a_class_two_times_with_no_extend_names = function() {
	
	__log("TEST: When_extending_a_class_two_times_with_no_extend_names");
	
	__log("TEST: Creating MyButton");
	var MyButton = com.tns.tests.Button1.extend({
		toString : function() {
		  	return "button1";	
		}
	});
	
	__log("TEST: Calling MyButton ctor");
	var button1 = new MyButton();
	__log("TEST: Calling button1 toString");
	var button1Label = button1.toString();
	button1.setLabel("first button");
	
	__log("TEST: Creating MyButton2 class");
	var MyButton2 = new com.tns.tests.Button1.extend({
		toString : function() {
	  		return "button2";	
	}});
	
	var button2 = new MyButton2();
	button2.setLabel("second button");
	var button2Label = button2.toString();
	
	__log("but1=" + button1Label + ", but2=" + button2Label);
	
	Assert(button1 != button2 && button1Label == "button1" && button2Label == "button2", "FAILED: When_extending_a_class_two_times_with_no_extend_names");
	
	var button1LabelAfterButton2Created = button1.toString();
	Assert(button1 != button2 && button1LabelAfterButton2Created == "button1" && button2Label == "button2", "FAILED: When_extending_a_class_two_times_with_no_extend_names");
}

var When_implementing_an_interface_with_new_the_overrides_should_work = function() {
	__log("TEST: When_implementing_an_interface_with_new__the_overrides_should_work");
	
	var MyButton = new com.tns.tests.Button1.extend("MyButton60", {
		toString : function() {
		  	return "button1";	
		} 
	});
	
	var button1 = new MyButton();
	var buttonClicked = false;
	button1.setOnClickListener(new android.view.View.OnClickListener("MyClickListener", {
		onClick : function() {
			buttonClicked = true;
		}
	}));
	button1.click(null);
	
	Assert(buttonClicked == true, "FAILED: When_implementing_an_interface_with_new__the_overrides_should_work");
}
var When_calling_instanceof_on_field_result_it_should_work = function() {
	__log("TEST: When_calling_instanceof_on_field_result_it_should_work");
	
	var MyButton = new com.tns.tests.Button1.extend("MyButton81", {
		toString : function() {
		  	return "button1";	
		},
	});
	
	var button1 = new MyButton();
	var dummyObject = button1.DummyClassAsObjectField;
	
	var isInstanceOf = dummyObject instanceof com.tns.tests.DummyClass;
	Assert(isInstanceOf == true, "FAILED: When_calling_instanceof_on_field_result_it_should_work.");
}

var When_calling_instanceof_on_method_result_it_should_work = function() {
	__log("TEST: When_calling_instanceof_on_method_result_it_should_work");
	
	var MyButton = new com.tns.tests.Button1.extend("MyButton98", {
		toString : function() {
		  	return "button1";	
		},
	});
	
	var button1 = new MyButton();
	var dummy = button1.getDummy();
	
	var isInstanceOf = dummy instanceof com.tns.tests.DummyClass;
	Assert(isInstanceOf == true, "FAILED: When_calling_instanceof_on_method_result_it_should_work.");
}

var When_calling_instanceof_on_method_argument_it_should_work = function() {
	__log("TEST: When_calling_instanceof_on_method_argument_it_should_work");
	
	var isInstanceOf;
	
	var MyButton = new com.tns.tests.Button1.extend("MyButton115", {
		toString : function() {
		  	return "button1";	
		},

		methodDummyClassAsObjectInArgs: function(object) {
			isInstanceOf = object instanceof com.tns.tests.DummyClass;
		}
	});
	
	var button1 = new MyButton();
	button1.callMethodDummyClassAsObjectInArgs();
	
	Assert(isInstanceOf == true, "FAILED: When_calling_instanceof_on_method_argument_it_should_work.");
}

var When_calling_instanceof_on_interface_it_should_work = function() {
	
	__log("NOT WORKING: When_calling_instanceof_on_interface_it_should_work");
	return;
	
	__log("TEST: When_calling_instanceof_on_interface_it_should_work");
	
	var interfaceInstance = new android.view.View.OnClickListener("ClickListener", {
		onClick : function() {
			buttonClicked = true;
		}
	});
	
	var secondInterfaceInstance = new android.view.View.OnClickListener("ClickListener", {
		onClick : function() {
			buttonClicked = true;
		}
	});
	
	var thirdInterfaceInstance = new android.view.View.OnClickListener("ClickListener", {
		onClick : function() {
			buttonClicked = true;
		}
	});
	
	//__log("Object get PrototypeOf" + Object.getPrototypeOf(interfaceInstance).toString());
	//__log("Object get PrototypeOf" + Object.getPrototypeOf(secondInterfaceInstance).toString());
	
	var isInstanceOfOnClickListener = interfaceInstance instanceof android.view.View.OnClickListener;
	var secondIsInstanceOfOnClickListener = secondInterfaceInstance instanceof android.view.View.OnClickListener;
	var thirdIsInstanceOfOnClickListener = thirdInterfaceInstance instanceof android.view.View.OnClickListener;
	__log("isInstanceOfOnClickListener: " + isInstanceOfOnClickListener + " secondIsInstanceOfOnClickListener:" + secondIsInstanceOfOnClickListener + " thirdIsInstanceOfOnClickListener: " + thirdIsInstanceOfOnClickListener);
	
	Assert(isInstanceOfOnClickListener == true, "FAILED: When_calling_instanceof_on_interface_it_should_work. Actual isInstanceOfOnClickListener: " + isInstanceOfOnClickListener);
	Assert(secondIsInstanceOfOnClickListener == true, "FAILED 11: When_calling_instanceof_on_interface_it_should_work. Actual secondIsInstanceOfOnClickListener: " + secondIsInstanceOfOnClickListener);
}

var When_calling_instanceof_it_should_work = function() {
	__log("TEST: When_calling_instanceof_it_should_work");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton148", {
		toString : function() {
		  	return "button1";	
		}
	});

	var button1 = new MyButton();
	
	var isInstanceOfMyButton = button1 instanceof MyButton;
	var isInstanceOfButton1 = button1 instanceof com.tns.tests.Button1;
	
	Assert(isInstanceOfMyButton == true, "FAILED: When_calling_instanceof_it_should_work. The button should be instanceof MyButton");
	
	Assert(isInstanceOfButton1 === true, "FAILED: When_calling_instanceof_it_should_work. The button should be instanceof Button1");
}


var When_accessing_a_property_it_should_call_the_get_and_set_methods_respectivelly = function() {
	__log("TEST: When_calling_instance_and_static_member_with_same_name_the_calls_should_succeed");
	var MyButton = com.tns.tests.Button1.extend("MyButton167", {
		toString : function() {
		  	return "button1";	
		}
	});

	var button1 = new MyButton();

	
	//call static method from instance
	var prop = button1.IMAGE_ID_PROP;
	
	Assert(prop === "image id prop", "FAILED (1): When_accessing_a_property_it_should_call_the_get_and_set_methods_respectivelly");
	
	button1.IMAGE_ID_PROP = "new value";
		
	prop = button1.IMAGE_ID_PROP;
	
	Assert(prop === "new value", "FAILED (2): When_accessing_a_property_it_should_call_the_get_and_set_methods_respectivelly");
}

var When_accessing_a_bool_property_it_should_call_the_is_and_set_methods_respectivelly = function() {
	__log("TEST: When_accessing_a_bool_property_it_should_call_the_is_and_set_methods_respectivelly");
	var MyButton = com.tns.tests.Button1.extend("MyButton190", {
		toString : function() {
		  	return "button1";	
		}
	});

	var button1 = new MyButton();

	
	//call static method from instance
	var prop = button1.IMAGE_ID_BOOL_PROP;
	
	Assert(prop == false, "FAILED: When_accessing_a_bool_property_it_should_call_the_is_and_set_methods_respectivelly");
	
	button1.IMAGE_ID_BOOL_PROP = true;
		
	prop = button1.IMAGE_ID_BOOL_PROP;
	
	Assert(prop == true, "FAILED: When_accessing_a_bool_property_it_should_call_the_is_and_set_methods_respectivelly");
}

var When_calling_instance_and_static_member_with_same_name_the_calls_should_succeed = function() {
	__log("TEST: When_calling_instance_and_static_member_with_same_name_the_calls_should_succeed");
	var MyButton = com.tns.tests.Button1.extend("MyButton213", {
		toString : function() {
		  	return "button1";	
		}
	});

	var button1 = new MyButton();

	//call static method from extended object
	MyButton.someMethod(1, "hello");
	
	//call static method from instance
	button1.someMethod(1, "hello");
	
	//call instance method
	button1.someMethod(1, new java.lang.Object());
}


var When_calling_toString_on_an_java_object_it_should_call_the_java_method = function() {
	__log("TEST: When_calling_toString_on_an_java_object_it_should_call_the_java_method");
	var instance = new com.tns.tests.DummyClass();
	var s = instance.toString();
	Assert(s.indexOf("com.tns.tests.DummyClass") != -1, "FAILED: When_calling_toString_on_an_java_object_it_should_call_the_java_method. Actual value: " + instance.toString());
}

var When_calling_toString_on_an_java_object_that_has_overriden_toString_in_js_it_should_call_the_js_method = function() {
	__log("TEST: When_calling_toString_on_an_java_object_that_has_overriden_toString_in_js_it_should_call_the_js_method");
	var MyButton = com.tns.tests.Button1.extend("MyButton240", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var instance = new MyButton();
	var s = instance.toString();
	Assert(s === "button1", "FAILED: When_calling_toString_on_an_java_object_that_has_overriden_toString_in_js_it_should_call_the_js_method. Actual value: " + instance.toString());
}

var When_extending_a_class_two_times_without_second_implementation_object = function() {
	__log("TEST: When_extending_a_class_two_times_without_second_implementation_object");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton257", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var button1 = new MyButton();
	var button1Label = button1.toString();
	
	var button2 = new com.tns.tests.Button1();
	var button2Label = button2.toString();
	
	__log("button1Label=" + button1Label + ", button2Label=" + button2Label);
	Assert(button1 !== button2 && button1Label !== button2Label, "FAILED: When_extending_a_class_two_times_without_second_implementation_object");
	
	
	var button1PostButton2CreationLabel = button1.toString();
	Assert(button1Label === button1PostButton2CreationLabel, "FAILED: When_extending_a_class_two_times_without_second_implementation_object");
}

var When__calling_super_method_using_the_prototype_property_of_a_function_it_should_call_the_super_method = function() {
	__log("TEST: When__calling_super_method_using_the_prototype_property_of_a_function_it_should_call_the_super_method");

	var button1 = new com.tns.tests.Button1();
	var prop = com.tns.tests.Button1.prototype.getIMAGE_ID_PROP.call(button1);
	
	Assert(prop === "image id prop", "FAILED: When__calling_super_method_using_the_prototype_property_of_a_function_it_should_call_the_super_method");	
}

var When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method = function() {
	__log("TEST: When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method");

	var MyButton = com.tns.tests.Button1.extend("MyButton289", {});
	var button1 = new MyButton();
	var prop = com.tns.tests.Button1.prototype.getIMAGE_ID_PROP.call(button1);
	Assert(prop === "image id prop", "FAILED: When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method");	
}

var When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method2 = function() {
	__log("TEST: When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method2");

	var MyButton = com.tns.tests.Button1.extend("MyButton294", {
		getIMAGE_ID_PROP: function() { return ""; }
	});
	var button1 = new MyButton();
	var prop = com.tns.tests.Button1.prototype.getIMAGE_ID_PROP.call(button1);
	Assert(prop === "image id prop", "FAILED: When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method2");	
}

var When_extending_a_class_and_calling_super_toString = function() {
	//__log("//TODO: NOT WORKING: super method calls are not working correctly. Tests fails with FAILED: When_extending_a_class_and_calling_super_toString. Actual: com.tns.com.tns.tests.Button1-MyButton305@52854640 Expected: com.tns.tests.Button1@");
	//return;
	
	__log("TEST: When_extending_a_class_and_calling_super_toString");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton", {
		toString : function() {
		  	return this.super.toString() + this.super.echo("success");	
		},
		
		echo : function(s) {
	  		return "fail";
		}
	});
	
	var button1 = new MyButton();
	var button1Label = button1.toString();
	Assert(button1Label.indexOf("com.tns.tests.Button1-") != -1, "FAILED: When_extending_a_class_and_calling_super_toString. Actual: " + button1Label + " Expected to contain: com.tns.tests.Button1-");
	Assert(button1Label.indexOf("MyButton") != -1, "FAILED: When_extending_a_class_and_calling_super_toString. Actual: " + button1Label + " Expected to contain: -MyButton");
	Assert(button1Label.indexOf("success") != -1, "FAILED: When_extending_a_class_and_calling_super_toString. Actual: " + button1Label + " Expected: com.tns.tests.Button1");
}

var When_extending_a_class_and_calling_super_method_it_should_work = function() {
	__log("TEST: When_extending_a_class_and_calling_super_method_it_should_work");
	var MyButton = com.tns.tests.Button1.extend("MyButton318", {
		toString : function() {
		  	return "toString overriden";	
		},
	
		getIMAGE_ID_PROP : function() {
			return this.super.getIMAGE_ID_PROP() + "!";
		}
	});
	var button1 = new MyButton();
	var button1SuperToString = button1.toString();
	
	Assert(button1SuperToString === "toString overriden", "FAILED (1): When_extending_a_class_and_calling_super_method_it_should_work");
	
	
	var IMAGE_ID_PROP_Result = button1.getIMAGE_ID_PROP();
	
	Assert(IMAGE_ID_PROP_Result === "image id prop!", "FAILED (2): When_extending_a_class_and_calling_super_method_it_should_work");
}

var When_accessing_static_members_on_an_extended_class = function() {
	__log("TEST: When_accessing_static_members_on_an_extended_class");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton341", {
		hashCode : function() {
		  	return 5454;	
		}
	});
	
	var MyButton2 = com.tns.tests.Button1.extend("MyButton347", {
		hashCode : function() {
		  	return 1212;	
		}
	});
	
	var setValue = 4;
	MyButton.setMyStaticIntField(setValue);
	var readValue = MyButton2.getMyStaticIntField();
	
	Assert(readValue == setValue, "FAILED: When_accessing_static_members_on_an_extended_class");
	
	var readValue = com.tns.tests.Button1.getMyStaticIntField();
	
	Assert(readValue == setValue, "FAILED: When_accessing_static_members_on_an_extended_class");
}

var When_implementing_an_interface_with_new__the_overrides_should_work = function() {
	__log("TEST: When_implementing_an_interface_with_new__the_overrides_should_work");
	
	var MyButton = new com.tns.tests.Button1.extends({
		toString : function() {
		  	return "button1";	
		} 
	});
	
	var button1 = new MyButton();
	var buttonClicked = false;
	button1.setOnClickListener(new android.view.View.OnClickListener({
		onClick : function() {
			buttonClicked = true;
		}
	}));
	button1.click(null);
	
	Assert(buttonClicked == true, "FAILED: When_implementing_an_interface_with_new__the_overrides_should_work");
}

var When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance = function() {
	__log("TEST: When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance");
	
	var MyButton = new com.tns.tests.Button1.extend("MyButton381", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var button1 = new MyButton();
	var dummy = button1.getDummy();
	var res = dummy.dummyMethod(123); //this will fail if button2 is not valid proxy object and properly exposed to js
	
	Assert(true, "FAILED: When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance");
}

var When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type = function() {
	__log("TEST: When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
	
	var Button = new com.tns.tests.Button1.extend("MyButton397", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var button = new Button();
	var object = button.getDummyClassAsObject();
	var name = object.getName();
	
	Assert(name == "dummy", "FAILED: When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
}

var When_a_java_field_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type = function() {
	__log("TEST: When_a_java_field_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
	
	var Button = new com.tns.tests.Button1.extend("MyButton413", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var button = new Button();
	var object = button.DummyClassAsObjectField;
	var name = object.getName();
	
	Assert(name == "dummy", "FAILED: When_a_java_field_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
}

var When_a_java_argument_is_passed_to_js_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type = function() {
	__log("TEST: When_a_java_argument_is_passed_to_js_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
	
	var name = "";
	var Button = new com.tns.tests.Button1.extend("MyButton418", {
		toString : function() {
		  	return "button1";	
		},
		
		methodDummyClassAsObjectInArgs: function(object) {
			name = object.getName();
			__log("The actual name is " + name);
		}
	});
	
	var button = new Button();
	var object = button.callMethodDummyClassAsObjectInArgs();
	
	Assert(name == "dummy", "FAILED: When_a_java_argument_is_passed_to_js_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
}

var When_a_java_object_is_returned_from_indexer_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type = function() {
	__log("TEST: When_a_java_object_is_returned_from_indexer_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
	
	var Button = new com.tns.tests.Button1.extend("MyButton450", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var button = new Button();
	var arrayOfObjects = button.getDummyClassAsObjectArray();
	var name = arrayOfObjects[0].getName();
	
	Assert(name == "dummy", "FAILED: When_a_java_object_is_returned_from_indexer_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type");
}

var  When_accessing_a_static_field_on_a_javascript_instance_it_should_work = function() {
	
	__log("TEST: When_accessing_a_static_field_on_a_javascript_instance_it_should_work");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton455", {
		hashCode : function() {
		  	return 5454;	
		},
		
		toString : function() {
		  	return "button1";	
		},
		
		equals : function() {
			return true;
		}
	});
	
	var valueUsingChild = MyButton.STATIC_IMAGE_ID;
	Assert(valueUsingChild == "static image id", "FAILED: When_accessing_a_static_field_on_a_javascript_instance_it_should_work.");
	
	var valueUsingParent = com.tns.tests.Button1.STATIC_IMAGE_ID;
	Assert(valueUsingParent == "static image id", "FAILED: When_accessing_a_static_field_on_a_javascript_instance_it_should_work.");
};


var TestRequireDirName = function() {

	__log("TEST: TestRequireDirName");
	
	var dir = __dirname;
	
	var expectedDirname = "/data/data/com.tns.android_runtime_testapp/files/app/tests";
		
	Assert(dir === expectedDirname, "TestRequireDirName FAILED: Expected value '" +  expectedDirname + "', actual value=" + dir);
}

var TestRequireFileName = function() {

	__log("TEST: TestRequireFileName");
	
	var file = __filename;
	
	var expectedFilename = "/data/data/com.tns.android_runtime_testapp/files/app/tests/tests.js";
		
	Assert(file === expectedFilename, "TestRequireFileName FAILED: Expected value '" +  expectedFilename + "', actual value=" + file);
	
	var file2 = module.filename;

	Assert(file === file2, "TestRequireFileName FAILED: Values 'file' and 'file2' should be strict equal");
}


var TestGarbageCollection = function() {

	__log("TEST: TestGarbageCollection");
	
	var obj = new com.tns.tests.ClassX();
	
	obj.dummy();
	
	Assert(obj != null, "TestGarbageCollection FAILED: Instance should not be null");
	
	obj = null;
	
	gc();
	gc();
	gc();
	java.lang.System.gc();
	java.lang.System.gc();
	java.lang.System.gc();
	
	new java.lang.Thread(new java.lang.Runnable("ThreadFunc", {
		run: function() {
			var isCollected = com.tns.tests.ClassX.IsCollected;
			Assert(isCollected === true, "TestGarbageCollection FAILED: Expected value is 'true', actual value=" + isCollected);
		}
	})).start();
}

var TestWorkingWithJavaArrayDoesNotMakeMemoryLeak = function() {

	__log("TEST: TestWorkingWithJavaArrayDoesNotMakeMemoryLeak");
	
	var size = 10 * 1024 * 1024;
	
	for (var i = 0; i < 100; i++) {
	
		var arr = java.lang.reflect.Array.newInstance(java.lang.Byte.class.getField("TYPE").get(null), size);
		
		var length = arr.length;
		
		Assert(length == size, "TestWorkingWithJavaArrayDoesNotMakeMemoryLeak FAILED: Expected value is " + size + ", actual value=" + length);
		
		arr[0] = 123;
		
		var el = arr[0];
		
		Assert(el == 123, "TestWorkingWithJavaArrayDoesNotMakeMemoryLeak FAILED: Expected value is 123, actual value=" + el);
	
		gc();
		java.lang.System.gc();
	}
}

var TestConstructorOverride = function() {

	__log("TEST: TestConstructorOverride");
	
	var ctorCalled = false;
	var isConstructor = false;

	var MyButton = new com.tns.tests.Button1.extend("MyButton574", {
		init : function() {
			ctorCalled = true;
			isConstructor = arguments[arguments.length - 1];
		},

		toString : function() {
		  	return "button1";	
		}
	});
	
	var btn = new MyButton();
	
	Assert(ctorCalled == true, "TestConstructorOverride FAILED: constructor not called");
	Assert(isConstructor == true, "TestConstructorOverride FAILED: isConstructor should be 'true'");
}

var TestConstructorOverrideOnTypeWithInitMethod = function() {

	__log("TEST: TestConstructorOverrideOnTypeWithInitMethod");
	
	var isCalled = false;
	var isConstructor = false;

	var MyDummyClassWithInit = com.tns.tests.DummyClassWithInit.extend("MyButton591", {
		init: function() {
			isCalled = true;
			isConstructor = arguments[arguments.length - 1];
		}
	});
	
	__log("TEST: TestConstructorOverrideOnTypeWithInitMethod: calling overriden ctor");
	var dummy = new MyDummyClassWithInit();
	
	Assert(isCalled == true, "TestConstructorOverrideOnTypeWithInitMethod FAILED: constructor not called");
	Assert(isConstructor == true, "TestConstructorOverrideOnTypeWithInitMethod FAILED: isConstructor should be 'true'");
	
	__log("TEST: TestConstructorOverrideOnTypeWithInitMethod: calling ctor as regular method");
	isCalled = undefined;
	isConstructor = undefined;
	dummy.callInit();

	Assert(isCalled == true, "TestConstructorOverrideOnTypeWithInitMethod FAILED: constructor not called");
	Assert(isConstructor == false, "FAILED: isConstructor should be 'false' actual: " + isConstructor);
}

var TestRequire = function() {
	__log("TEST: TestRequire");
	
	var myModule = require("../simplemodule");
	myModule.myLog("Hello world from NativeScript!");
}

var TestArrays = function() {
	__log("TEST: TestArrays");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton639", {
		toString : function() {
		  	return "button1";	
		}
	});
	var tester = new MyButton(); 
	var instances = tester.getDummyInstances();
	
	var instanceFound = false;

	for (var i = 0; i < instances.length; i++)
	{
		if (instances[i].getName() == "second");
		{
			instanceFound = true;
		}
	}
	
	Assert(instanceFound, "TestArrays FAILED: TestArrays indexer not working");
	
	instances[0] = instances[1];
	
	var instances0name = instances[0].getName();
	var instances1name = instances[1].getName();
	
	Assert(instances0name == instances1name, "TestArrays FAILED: Cannot set element into the array");
}

var TestArrayLengthPropertyIsNumber = function() {

	__log("TEST: TestArrayLengthPropertyIsNumber");
	
	var expectedLength = 10;

	function getLength(x)
	{
		var arr = x.getIntArray1(expectedLength);
		
		return arr ? arr.length : 123456;
	}
	
	var MyButton = com.tns.tests.Button1.extend("MyButton680", {
		toString : function() {
		  	return "button1";	
		}
	});
	
	var count = getLength(new MyButton());
	
	Assert(count === expectedLength, "TestArrayLengthPropertyIsNumber FAILED: Array length property should be number");
}

var TestCreationOfLocationListener = function() {
	__log("TEST: TestCreationOfLocationListener");
	
	var onLocationChangedCalled = false;
	var onProviderDisabledCalled = false;
	var onProviderEnabledCalled = false;
	
	var listener = new android.location.LocationListener("LocationListener",{
		onLocationChanged: function(location) {
			onLocationChangedCalled = true;
		},
		onProviderDisabled: function(provider) {
			onProviderDisabledCalled = true;
		},
		onProviderEnabled: function(provider) {
			onProviderEnabledCalled = true;
		}
	});
	
	listener.onLocationChanged(null);
	
	Assert(onLocationChangedCalled, "TestCreationOfLocationListener FAILED: onLocationChanged is not called");
	
	listener.onProviderDisabled("");
	
	Assert(onProviderDisabledCalled, "TestCreationOfLocationListener FAILED: onProviderDisabled is not called");
	
	listener.onProviderEnabled("");
	
	Assert(onProviderEnabledCalled, "TestCreationOfLocationListener FAILED: onProviderEnabled is not called");
}

var TestInnerClassCreation = function() {
	__log("TEST: TestInnerClassCreation");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton726", {
		toString : function() {
	  		return "button1"	
	}});
	
	var button1 = new MyButton();
	
	var innerButton = new button1.InnerButton();
	
	var s = innerButton.getSomeString();
	
	Assert(s.length > 0, "TestInnerClassCreation FAILED: innerButton.getSomeString returned empty string");
	
	var innerButton2 = new new button1.InnerButton().InnerClass2(123)
	
	var s1 = innerButton2.getSomeString2();
	
	Assert(s1.length > 0, "TestInnerClassCreation FAILED: innerButton2.getSomeString2 returned empty string");
}

var TestNestedClassCreation = function() {
	__log("TEST: TestNestedClassCreation");

	var i = 123;
	
	var nested = new com.tns.tests.Button1.InnerStaticClass(i);
	
	var actual_i = nested.getInt();
	
	Assert(actual_i == i, "TestNestedClassCreation FAILED: InnerStaticClass.getInt returned wrong value " + actual_i + ", expected " + i);
}

var TestCallMethodOnAnObjectReturnedAsObjectWithoutMetadata = function() {
	__log("TEST: TestCallMethodOnAnObjectReturnedAsObjectWithoutMetadata");
	
	var dummy = new com.tns.tests.DummyClass();
	
	var dummy2 = dummy.getDummyClassAsObject();
	
	var name = dummy2.getName();
	
	Assert(name == "dummy", "TestCallMethodOnAnObjectReturnedAsObjectWithoutMetadata FAILED: Expected value is 'dummy', returned value is '" + name + "'");
}


var TestGetFieldOnAnObjectReturnedAsObjectWithoutMetadata = function() {
	__log("TEST: TestGetFieldOnAnObjectReturnedAsObjectWithoutMetadata");
	
	var dummy = new com.tns.tests.DummyClass();
	
	dummy.setDummyField();
	
	var dummy2 = dummy.dummyField;
	
	var name = dummy2.getName();
	
	Assert(name == "dummy", "TestGetFieldOnAnObjectReturnedAsObjectWithoutMetadata FAILED: Expected value is 'dummy', returned value is '" + name + "'");
}


var TestCallMethodOnAnObjectPassedAsParameterInOverriddenMethodAsAnObjectWithoutMetadata = function() {
	__log("TEST: TestCallMethodOnAnObjectPassedAsParameterInOverriddenMethodAsAnObjectWithoutMetadata");
	
	var D = com.tns.tests.DummyClass.DummyDerivedClass.extend("D",{
		dummyMethod: function(dummy) {
			return this.getName();
		}
	})
	
	var d = new D();

	var name = d.executeCallback();
	
	Assert(name == "dummy", "TestCallMethodOnAnObjectPassedAsParameterInOverriddenMethodAsAnObjectWithoutMetadata FAILED: Expected value is 'dummy', returned value is '" + name + "'");
}

var TestAccessArrayElementAsObjectWithoutMetadata = function() {

	__log("TEST: TestAccessArrayElementAsObjectWithoutMetadata");
	
	var d = new com.tns.tests.DummyClass();
	
	var arr = d.getDummyClassArrayAsObject();
	
	var arrLength = arr.length;
	
	Assert(arrLength == 1, "TestAccessArrayElementAsObjectWithoutMetadata FAILED: Expected array length is 1, actual length=" + arrLength);
	
	var dummy = arr[0];
	
	var name = dummy.getName();
	
	Assert(name === "dummy", "TestAccessArrayElementAsObjectWithoutMetadata FAILED: Expected value is 'dummy', returned value is '" + name + "'");
}

var TestCallMethodThatReturnsNull = function() {

	__log("TEST: TestCallMethodThatReturnsNull");

	var dummy = new com.tns.tests.DummyClass();
	
	var x = dummy.getNull();
	
	Assert(x == null, "TestCallMethodThatReturnsNull FAILED: Expected value is null, but actual value is not null");
}

var TestCallMethodThatReturnsNullString = function() {

	__log("TEST: TestCallMethodThatReturnsNullString");

	var dummy = new com.tns.tests.DummyClass();
	
	var x = dummy.getNullString();
	
	Assert(x == null, "TestCallMethodThatReturnsNullString FAILED: Expected value is null, but actual value is not null");
}

var TestAccessNullField = function() {

	__log("TEST: TestAccessNullField");

	var dummy = new com.tns.tests.DummyClass();
	
	var x = dummy.nullField
	
	Assert(x == null, "TestAccessNullField FAILED: Expected value is null, but actual value is not null");
}

var TestAccessNullArrayElement = function() {

	__log("TEST: TestAccessNullArrayElement");

	var dummy = new com.tns.tests.DummyClass();
	
	var arr = dummy.getArrayWithNullElement();
	
	__log("arr=" + arr.length)
	
	var x = arr[0];
	
	Assert(x == null, "TestAccessNullArrayElement FAILED: Expected value is null, but actual value is not null");
}

var TestCallMethodWithIntVarArg = function() {

	__log("TEST: TestCallMethodWithIntVarArg");
	
	var dummy = new com.tns.tests.DummyClass();
	
	var s = dummy.concatIntArrayAsString([1, 2, 3, 4]);
	
	Assert(s === "1234", "TestCallMethodWithIntVarArg FAILED: Expected value is '1234', but actual value is=" + s);
}

var TestCallMethodWithCharVarArg = function() {

	__log("TEST: TestCallMethodWithCharVarArg");
	
	var dummy = new com.tns.tests.DummyClass();
	
	var s = dummy.concatCharArrayAsString(['t', 'e', 's', 't']);
	
	Assert(s === "test", "TestCallMethodWithCharVarArg FAILED: Expected value is 'test', but actual value is=" + s);
}

var TestCallMethodWithObjectVarArg = function() {

	__log("TEST: TestCallMethodWithObjectVarArg");
	
	var dummy = new com.tns.tests.DummyClass();
	
	var s = dummy.concatObjectArrayAsString([1, "test", false]);

	Assert(s === "1, test, false", "TestCallMethodWithObjectVarArg FAILED: Expected value is '1, test, false', but actual value is=" + s);
}

var TestCanInheritFromClassInAndroidSupportLibrary = function() {

	__log("TEST: TestCanInheritFromClassInAndroidSupportLibrary");
	
	var MyParcelableCompat = android.support.v4.os.ParcelableCompat.extend("MyParcelableCompat", {
		toString: function() {
			return "MyParcelableCompat";
		}
	});
	
	var compat = new MyParcelableCompat();
	
	var s = compat.toString();
	
	Assert(s === "MyParcelableCompat", "TestCanInheritFromClassInAndroidSupportLibrary FAILED: Expected value is 'MyParcelableCompat', but actual value is=" + s);
}

var TestCallMethodWithByteParameter = function() {

	__log("TEST: TestCallMethodWithByteParameter");
	
	var b = java.lang.Byte.valueOf(byte(123));
	
	var s = "" + b;
	
	Assert(s === "123", "TestCallMethodWithByteParameter FAILED: Expected value is '123', but actual value is=" + s);
}

var TestCallMethodWithFloatParameter = function() {

	__log("TEST: TestCallMethodWithFloatParameter");
	
	var d = new com.tns.tests.DummyClass();
	
	var s = d.methodWithoutOverloads(1.23);
	
	Assert(s === "float=1.23", "TestCallMethodWithFloatParameter FAILED: Expected value is 'float=1.23', but actual value is=" + s);
}

var TestCanCallStaticMethodThroughBaseClass = function() {

	__log("TEST: TestCanCallStaticMethodThroughBaseClass");
	
	var name = com.tns.tests.MyClassDerived.getName();

	Assert(name === "com.tns.tests.MyClassBase", "TestCanCallStaticMethodThroughBaseClass FAILED: TestCanCallStaticMethodThroughBaseClass: Expected value is 'com.tns.tests.MyClassBase', but actual value is=" + name);
}

var TestUseFieldThatIsArray = function() {

	__log("TEST: TestUseFieldThatIsArray");
	
	var d = new com.tns.tests.DummyClass();
	
	var arrInt = d.arrIntField;
	
	var arrIntLength = arrInt.length;
	
	Assert(arrIntLength === 5, "TestUseFieldThatIsArray FAILED: Expected array length is 5, but actual length is=" + arrIntLength);
	
	var intElement = arrInt[2];
	
	Assert(intElement === 33, "TestUseFieldThatIsArray FAILED: Expected array element value is 33, but actual element value is=" + intElement);
	
	var arrString = d.arrStringField;
	
	var arrStringLength = arrString.length;
	
	Assert(arrIntLength === 5, "TestUseFieldThatIsArray FAILED: Expected array length is 5, but actual length is=" + arrStringLength);
	
	var stringElement = arrString[2];
	
	Assert(stringElement === "cc", "TestUseFieldThatIsArray FAILED: Expected array element value is 'cc', but actual element value is=" + stringElement);
}

var TestCanAssignArrayToField = function() {

	__log("TEST: TestCanAssignArrayToField");
	
	var d = new com.tns.tests.DummyClass();
	
	var arr = d.arrIntField2;
	
	Assert(arr === null, "TestCanAssignArrayToField FAILED: Expected value is null, but actual value is=" + arr);
	
	d.arrIntField2 = d.arrIntField;
	
	var arrLength = d.arrIntField2.length;
	
	Assert(arrLength === 5, "TestCanAssignArrayToField FAILED: Expected array length is 5, but actual length is=" + arrLength);
}

var TestCallMethodThatReturnsLong = function() {

	__log("TEST: TestCallMethodThatReturnsLong");
	
	var n = java.lang.Long.parseLong("9007199254740991"); // 9007199254740991 = 2^53-1

	Assert(n.__proto__.valueOf() === 0, "TestCallMethodThatReturnsLong FAILED: n.__proto__.valueOf() === 0");
	Assert(n.value === undefined, "TestCallMethodThatReturnsLong FAILED: n.value === undefined");
	Assert(typeof n === "number", "TestCallMethodThatReturnsLong FAILED: typeof n === 'number'");
	Assert(n instanceof Number === false, "TestCallMethodThatReturnsLong FAILED: n instanceof Number === false");

	var n = java.lang.Long.parseLong("9007199254740992"); // 9007199254740992 = 2^53
	
	var ctorFuncName = n.__proto__.constructor.name;
	Assert(ctorFuncName === "NativeScriptLongNumber", "TestCallMethodThatReturnsLong FAILED: Expected constructor function name is 'NativeScriptLongNumber', actual name=" + ctorFuncName);
	Assert(isNaN(n.valueOf()) === true, "TestCallMethodThatReturnsLong FAILED: Expected JavaScript value is NaN");
	var javaValue = n.value;
	Assert(javaValue === "9007199254740992", "TestCallMethodThatReturnsLong FAILED: Expected Java value is '9007199254740992', actual value=" + javaValue);
	var typeName = typeof n; 
	Assert(typeName === "object", "TestCallMethodThatReturnsLong FAILED: Expected type is 'object', actual type=" + typeName);
}

var TestCallMethodWithLongParameter = function() {

	__log("TEST: TestCallMethodWithLongParameter");
	
	var d = new com.tns.tests.DummyClass();
	
	var n1 = java.lang.Long.parseLong("9007199254740991"); // 9007199254740991 = 2^53-1
	var s1 = d.getLongAsString(n1);
	Assert(s1 === "9007199254740991", "TestCallMethodWithLongParameter FAILED: Expected value is '9007199254740991', actual value=" + s1);

	var n2 = java.lang.Long.parseLong("9007199254740992"); // 9007199254740992 = 2^53
	var s2 = d.getLongAsString(n2);
	Assert(s2 === "9007199254740992", "TestCallMethodWithLongParameter FAILED: Expected value is '9007199254740992', actual value=" + s2);
	
	var n3 = java.lang.Long.parseLong("9007199254740993"); // 9007199254740992 = 2^53+1
	var s3 = d.getLongAsString(n3);
	Assert(s3 === "9007199254740993", "TestCallMethodWithLongParameter FAILED: Expected value is '9007199254740993', actual value=" + s3);
}

var TestCallMethodWithLongCastArgument = function() {

	__log("TEST: TestCallMethodWithLongCastArgument");
	
	var d = new com.tns.tests.DummyClass();
	
	var s1 = d.getLongAsString(long("9007199254740991")); // 9007199254740991 = 2^53-1
	Assert(s1 === "9007199254740991", "TestCallMethodWithLongCastArgument FAILED: Expected value is '9007199254740991', actual value=" + s1);
	
	var s2 = d.getLongAsString(long(9007199254740991)); // 9007199254740991 = 2^53-1
	Assert(s2 === "9007199254740991", "TestCallMethodWithLongCastArgument FAILED: Expected value is '9007199254740991', actual value=" + s2);

	var s3 = d.getLongAsString(long("9007199254740992")); // 9007199254740992 = 2^53
	Assert(s3 === "9007199254740992", "TestCallMethodWithLongCastArgument FAILED: Expected value is '9007199254740992', actual value=" + s3);
	
	var s4 = d.getLongAsString(long("9007199254740993")); // 9007199254740992 = 2^53+1
	Assert(s4 === "9007199254740993", "TestCallMethodWithLongCastArgument FAILED: Expected value is '9007199254740993', actual value=" + s4);
}

var TestCallToStringOfNativeScriptLongObject = function() {

	__log("TEST: TestCallToStringOfNativeScriptLongObject");
	
	var n = java.lang.Long.parseLong("9007199254740992"); // 9007199254740992 = 2^53
	
	var s = n.toString();
	
	Assert(s === n.value, "TestCallToStringOfNativeScriptLongObject FAILED: Expected value is '9007199254740992', actual value=" + s);
}

var TestCallMethodWithLongParameterWithNumberObject = function() {

	__log("TEST: TestCallMethodWithLongParameterWithNumberObject");
	
	var d = new com.tns.tests.DummyClass();
	
	var s = d.getLongAsString(new Number("9007199254740991")); // 9007199254740991 = 2^53-1
	Assert(s === "9007199254740991", "TestCallMethodWithLongParameterWithNumberObject FAILED: Expected value is '9007199254740991', actual value=" + s);
}

var TestCallMethodWithMinAndMaxLongValues = function() {

	__log("TEST: TestCallMethodWithMinAndMaxLongValues");
	
	var d = new com.tns.tests.DummyClass();
	
	var maxLong = d.getMaxLong();
	var sMax = d.getLongAsString(maxLong);
	Assert(sMax === "9223372036854775807", "TestCallMethodWithMinAndMaxLongValues FAILED: Expected value is '9223372036854775807', actual value=" + sMax);

	var minLong = d.getMinLong();
	var sMin = d.getLongAsString(minLong);
	Assert(sMin === "-9223372036854775808", "TestCallMethodWithMinAndMaxLongValues FAILED: Expected value is '-9223372036854775808', actual value=" + sMin);
}

var TestCallMethodWithByteParameter = function() {

	__log("TEST: TestCallMethodWithByteParameter");
	
	var d = new com.tns.tests.DummyClass();
	
	var s1 = d.method1(byte(123));
	Assert(s1 === "byte=123", "TestCallMethodWithByteParameter FAILED: Expected value is 'byte=123', actual value=" + s1);

	var s2 = d.method1(byte(new Number(123)));
	Assert(s2 === "byte=123", "TestCallMethodWithByteParameter FAILED: Expected value is 'byte=123', actual value=" + s2);

	var s3 = d.method1(byte("123"));
	Assert(s3 === "byte=123", "TestCallMethodWithByteParameter FAILED: Expected value is 'byte=123', actual value=" + s3);
	
	var s4 = d.method1(byte(new String("123")));
	Assert(s4 === "byte=123", "TestCallMethodWithByteParameter FAILED: Expected value is 'byte=123', actual value=" + s4);
}

var TestCallMethodWithShortParameter = function() {

	__log("TEST: TestCallMethodWithShortParameter");
	
	var d = new com.tns.tests.DummyClass();
	
	var s1 = d.method1(short(12345));
	Assert(s1 === "short=12345", "TestCallMethodWithShortParameter FAILED: Expected value is 'short=12345', actual value=" + s1);

	var s2 = d.method1(short(new Number(12345)));
	Assert(s2 === "short=12345", "TestCallMethodWithShortParameter FAILED: Expected value is 'short=12345', actual value=" + s2);

	var s3 = d.method1(short("12345"));
	Assert(s3 === "short=12345", "TestCallMethodWithShortParameter FAILED: Expected value is 'short=12345', actual value=" + s3);
	
	var s4 = d.method1(short(new String("12345")));
	Assert(s4 === "short=12345", "TestCallMethodWithShortParameter FAILED: Expected value is 'short=12345', actual value=" + s4);
}

var TestCallMethodWithBooleanParameter = function() {

	__log("TEST: TestCallMethodWithBooleanParameter");
	
	var d = new com.tns.tests.DummyClass();
	
	var s1 = d.method1(true);
	Assert(s1 === "boolean=true", "TestCallMethodWithBooleanParameter FAILED: Expected value is 'boolean=true', actual value=" + s1);

	var s2 = d.method1(false);
	Assert(s2 === "boolean=false", "TestCallMethodWithBooleanParameter FAILED: Expected value is 'boolean=false', actual value=" + s1);

	var s3 = d.method1(new Boolean(true));
	Assert(s3 === "boolean=true", "TestCallMethodWithBooleanParameter FAILED: Expected value is 'boolean=true', actual value=" + s3);

	var s4 = d.method1(new Boolean(false));
	Assert(s4 === "boolean=false", "TestCallMethodWithBooleanParameter FAILED: Expected value is 'boolean=false', actual value=" + s4);
}

var TestThrowJavaScriptExceptionWhenCannotResolveJavaMethod = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenCannotResolveJavaMethod");
	
	var exceptionCaught = false;
	
	var d = new com.tns.tests.DummyClass();
	
	try
	{
		var s = d.method1(new java.lang.Object());
	}
	catch (e)
	{
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenCannotResolveJavaMethod FAILED: No exception is thrown");
}

var TestThrowJavaScriptExceptionWhenCannotResolveJavaConstructor = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenCannotResolveJavaConstructor");
	
	var exceptionCaught = false;
	
	try
	{
		var d = new com.tns.tests.DummyClass(new java.lang.Object());
	}
	catch (e)
	{
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenCannotResolveJavaConstructor FAILED: No exception is thrown");
}

var TestThrowJavaScriptExceptionWhenSetArrayRefElementWithNakedJavaScriptObject = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenSetArrayRefElementWithNakedJavaScriptObject");
	
	var arr = java.lang.reflect.Array.newInstance(java.lang.Object.class, 10);
	
	var o = new java.lang.Object();
	arr[0] = o;
	
	var exceptionCaught = false;
	
	try
	{
		arr[0] = {};
	}
	catch (e)
	{
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenSetArrayRefElementWithNakedJavaScriptObject FAILED: No exception is thrown");
	
	var isOldElement = o.equals(arr[0]);
	
	Assert(isOldElement === true, "TestThrowJavaScriptExceptionWhenSetArrayRefElementWithNakedJavaScriptObject FAILED: Old and new element should be the same");
}

var TestThrowJavaScriptExceptionWhenSetArrayRefElementWithJavaScriptPrimitive = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenSetArrayRefElementWithJavaScriptPrimitive");
	
	var arr = java.lang.reflect.Array.newInstance(java.lang.Object.class, 10);
	
	var o = new java.lang.Object();
	arr[0] = o;
	
	var exceptionCaught = false;
	
	try
	{
		arr[0] = 123;
	}
	catch (e)
	{
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenSetArrayRefElementWithJavaScriptPrimitive FAILED: No exception is thrown");
	
	var isOldElement = o.equals(arr[0]);
	
	Assert(isOldElement === true, "TestThrowJavaScriptExceptionWhenSetArrayRefElementWithJavaScriptPrimitive FAILED: Old and new element should be the same");
}

var TestThrowJavaScriptExceptionWhenCreateJavaObjectWithNakedJavaScriptObject = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenCreateJavaObjectWithNakedJavaScriptObject");
	
	var exceptionCaught = false;

	try
	{
		var d = new com.tns.tests.DummyClass({});
	}
	catch (e)
	{
		exceptionCaught = true;
	}

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenCreateJavaObjectWithNakedJavaScriptObject FAILED: No exception is thrown");	
}

var TestThrowJavaScriptExceptionWhenCallJavaMethodWithNakedJavaScriptObject = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenCallJavaMethodWithNakedJavaScriptObject");
	
	var exceptionCaught = false;
	
	var d = new com.tns.tests.DummyClass();

	try
	{
		var s = d.method2({});
	}
	catch (e)
	{
		exceptionCaught = true;
	}

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenCallJavaMethodWithNakedJavaScriptObject FAILED: No exception is thrown");	
}

var TestThrowJavaScriptExceptionWhenCallJavaMethodWithJavaScriptPrimitiveWhenJavaRefIsExpected = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenCallJavaMethodWithJavaScriptPrimitiveWhenJavaRefIsExpected");
	
	var exceptionCaught = false;
	
	var d = new com.tns.tests.DummyClass();

	try
	{
		var s = d.method2(123);
	}
	catch (e)
	{
		exceptionCaught = true;
	}

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenCallJavaMethodWithJavaScriptPrimitiveWhenJavaRefIsExpected FAILED: No exception is thrown");	
}

var TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsDeleted = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsDeleted");
	
	var exceptionCaught = false;
	
	var impl = {
		echo : function(s) {
	  		return "!!!" + s;
		}
	};
	
	var MyButton = com.tns.tests.Button1.extend("btn1303", impl);
	var btn = new MyButton();
	
	var echo = com.tns.tests.Button1.prototype.echo; 
	delete com.tns.tests.Button1.prototype.echo;
	delete impl.echo;
	
	try
	{
		__log("btn=" + btn.triggerEcho("12345"));
	}
	catch (e)
	{
		exceptionCaught = true;
	}	

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsDeleted FAILED (1): No exception is thrown");
	
	exceptionCaught = false;	

	try
	{
		__log("btn=" + btn.triggerEchoAsObject("123"));
	}
	catch (e)
	{
		exceptionCaught = true;
	}	

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsDeleted FAILED (2): No exception is thrown");
	
	com.tns.tests.Button1.prototype.echo = echo;
}


var TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsOverwritten = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsOverwritten");
	
	var exceptionCaught = false;
	
	var impl = {
		echo : function(s) {
	  		return "!!!" + s;
		}
	};
	
	var MyButton = com.tns.tests.Button1.extend("btn1344", impl);
	var btn = new MyButton();
	
	impl.echo = ""
	
	try
	{
		__log("btn=" + btn.triggerEcho("123"));
	}
	catch (e)
	{
		exceptionCaught = true;
	}	

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsOverwritten FAILED (1): No exception is thrown");
	
	exceptionCaught = false;	

	try
	{
		__log("btn=" + btn.triggerEchoAsObject("123"));
	}
	catch (e)
	{
		exceptionCaught = true;
	}	

	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsOverwritten FAILED (2): No exception is thrown");	
}

var TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed");
	
	var methodCalled = false;
	var exceptionCaught = false;
	
	var d = new com.tns.tests.DummyClass();
	
	var impl1 = new com.tns.tests.DummyClass.MyInterface("impl1_1393", {
		echoInt: function(i) { methodCalled = true; return i; }
	});
	
	var i = d.triggerEchoInt(impl1, 123);
	
	Assert(methodCalled === true, "TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed FAILED: Method override is not called");
	
	Assert(i === 123, "TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed FAILED: Expected value is 123, actual value=" + i);
	
	try
	{
		d.triggerDoSomething(impl1);
	}
	catch (e)
	{
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed FAILED: No exception is thrown");
	
	methodCalled = false;
	exceptionCaught = false;
	
	var impl2 = new com.tns.tests.DummyClass.MyInterface("impl2_1417",{
		doSomething: function() { methodCalled = true; }
	});
	
	d.triggerDoSomething(impl2);
	
	Assert(methodCalled === true, "TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed FAILED: Method override is not called");
	
	try
	{
		d.triggerEchoInt(impl2, 123);
	}
	catch (e)
	{
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed FAILED: No exception is thrown");	
}

var TestThrowJavaScriptExceptionWhenImplementationObjectIsUsedToExtendMoreThanOneClass = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenImplementationObjectIsUsedToExtendMoreThanOneClass");
	
	var implObj = {}
	
	var exceptionCaught = false;
	
	var Button1 = new com.tns.tests.Button1.extend("Button1", implObj);
	
    try
	{
		var D = com.tns.tests.DummyClass.DummyDerivedClass.extend("D1440", implObj);
	}
	catch (e)
	{
		__log("TEST: TestThrowJavaScriptExceptionWhenImplementationObjectIsUsedToExtendMoreThanOneClass exception:" + e);
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenImplementationObjectIsUsedToExtendMoreThanOneClass FAILED: No exception is thrown");
}

var TestThrowJavaScriptExceptionWhenPassBooleanArgumentWhereNotExpected = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenPassBooleanArgumentWhereNotExpected");
	
	var d = new com.tns.tests.DummyClass();
	
	var exceptionCaught = false;
	
	try
	{
		d.setName(false);	
	}
	catch (e)
	{
		__log("e=" + e);
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenPassBooleanArgumentWhereNotExpected FAILED: No exception is thrown");
	
	exceptionCaught = false;

	try
	{
		d.setName(true);	
	}
	catch (e)
	{
		__log("e=" + e);
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenPassBooleanArgumentWhereNotExpected FAILED: No exception is thrown");
}

var TestThrowJavaScriptExceptionWhenPassNumberArgumentWhereNotExpected = function() {

	__log("TEST: TestThrowJavaScriptExceptionWhenPassNumberArgumentWhereNotExpected");
	
	var d = new com.tns.tests.DummyClass();
	
	var exceptionCaught = false;
	
	try
	{
		d.setName(1);	
	}
	catch (e)
	{
		__log("e=" + e);
		exceptionCaught = true;
	}
	
	Assert(exceptionCaught === true, "TestThrowJavaScriptExceptionWhenPassNumberArgumentWhereNotExpected FAILED: No exception is thrown");
}

var TestCallProctedMethodDefinedAsAbstractAndThenOverwritten = function() {

	__log("TEST: TestCallProctedMethodDefinedAsAbstractAndThenOverwritten");

	var C = com.tns.tests.AbsClassImpl.extend("C1520", {
		echoString: function(s) {
			var echo = this.super.echoString(s);
			return echo + "!";
		}
	});
	var c = new C();
	
	var s = c.echo("test");
	
	Assert(s === "test!", "TestCallProctedMethodDefinedAsAbstractAndThenOverwritten FAILED: Expected value 'test!', actual value=" + s);
}

var TestCharSequenceReturnValueIsTreatedAsStringWhenItIsString = function() {

	__log("TEST: TestCharSequenceReturnValueIsTreatedAsStringWhenItIsString");

	var d = new com.tns.tests.DummyClass();
	
	var s = d.getNameAsCharSequence();
	
	Assert(s === "dummy", "TestCharSequenceReturnValueIsTreatedAsStringWhenItIsString FAILED: Expected value 'dummy', actual value=" + s);
}


var TestObjectReturnValueIsTreatedAsStringWhenItIsString = function() {
	
	__log("TEST: TestObjectReturnValueIsTreatedAsStringWhenItIsString");

	var d = new com.tns.tests.DummyClass();
	
	var s = d.getNameAsCharSequence();
	
	Assert(s === "dummy", "TestObjectReturnValueIsTreatedAsStringWhenItIsString FAILED: Expected value 'dummy', actual value=" + s);
}

var TestCanFindImplementationObjectWhenCreateExtendedObjectFromJava = function() {

	__log("TEST: TestCanFindImplementationObjectWhenCreateExtendedObjectFromJava");

	var O = java.lang.Object.extend("O1560", {});
	
	var ctor = (new O()).getClass().getConstructors()[0];
	
	var o = ctor.newInstance(null);

	Assert(o !== null, "TestCanFindImplementationObjectWhenCreateExtendedObjectFromJava FAILED: Cannot find implementation object for given extended class");
}

var TestCanCallMethodThatReturnsArrayOfInterfaces = function() {

	__log("TEST: TestCanCallMethodThatReturnsArrayOfInterfaces");

	var arr = java.lang.reflect.Array.newInstance(android.view.View.OnClickListener.class, 1);
	
	Assert(arr !== null, "TestCanCallMethodThatReturnsArrayOfInterfaces FAILED: Cannot create an array of interfaces");
	
	var listener = new android.view.View.OnClickListener("listener1580", {});
	
	arr[0] = listener;

	Assert(arr[0] !== null, "TestCanCallMethodThatReturnsArrayOfInterfaces FAILED: Cannot set an interface implementation to an array of interfaces");
}

var TestCanParseSignatureWithTypesThatContainsCapitalLettersForPrimitiveTypes = function() {

	__log("TEST: TestCanParseSignatureWithTypesThatContainsCapitalLettersForPrimitiveTypes");

	var formats = java.lang.reflect.Array.newInstance(java.text.NumberFormat.class, 2);
	formats[0] = java.text.NumberFormat.getInstance();
	formats[1] = java.text.NumberFormat.getIntegerInstance();
	var mf = new java.text.MessageFormat("{0}, {1}")
	mf.setFormats(formats);
	var arr = mf.parse("123, 4567");
	var len = arr.length;

	Assert(len === 2, "TestCanParseSignatureWithTypesThatContainsCapitalLettersForPrimitiveTypes FAILED: Expected length is 2, actual=" + len);	
}

var TestCanCallToStringOnClassProxy = function() {
	__log("TEST: TestCanCallToStringOnClassProxy");

	var view = android.view.View;
	var s = view.toString();
	
	Assert(s.length > 0, "TestCanCallToStringOnClassProxy FAILED: Cannot call toString on class proxy");	
}

var When_accessing_class_property_on_a_extended_class_it_should_return_the_extended_class = function() {
	__log("TEST: When_accessing_class_property_on_a_extended_class_it_should_return_the_extended_class");
	
	var MyButton = com.tns.tests.Button1.extend("MyButton1615", {
		toString : function() {
	  		return "button1"	
	}});
	

	var button = new MyButton();
	var clazz1 = button.getClass();
	var name1 = clazz1.getName();
	Assert(name1.indexOf("MyButton1615") != -1, "FAILED: When_accessing_class_property_on_a_extended_class_it_should_return_the_extended_class");

	var clazz2 = MyButton.class;
	var name2 = clazz2.getName();
	Assert(name2.indexOf("MyButton1615") != -1, "FAILED: When_accessing_class_property_on_a_extended_class_it_should_return_the_extended_class");
}

var When_using_global_in_a_module_global_should_be_defined = function() {
	__log("TEST: When_using_global_in_a_module_global_should_be_defined");
	
	var module = require("../modules/module");
	module.accessGlobalObject();
}

var When_using_package_json_should_load_module = function() {
	__log("TEST: When_using_package_json_should_load_module");
	
	var module2 = require("../module2");
	var value456 = module2.value456;
	
	Assert(value456 === 456, "FAILED: When_using_package_json_should_load_module");
}

var When_require_bcl_module_it_should_be_loaded = function() {
	__log("TEST: When_require_bcl_module_it_should_be_loaded");
	
	var module = require("bclmodule");
	module.getModuleName();
}

var When_require_a_module_it_should_be_loaded = function() {
	__log("TEST: When_require_a_module_it_should_be_loaded");
	
	var module = require("./testModules/testmodule");
	var moduleName = module.getModuleName();
	
	Assert(moduleName == "testModule", "FAILED: When_require_a_module_it_should_be_loaded");
}


var When_require_a_bcl_module_in_a_dir_it_should_be_loaded = function() {
	__log("TEST: When_require_a_bcl_module_in_a_dir_it_should_be_loaded");
	
	var module = require("tests/testModules/testBclModule");
	var moduleName = module.getModuleName();
	
	Assert(moduleName == "testBclModule", "FAILED: When_require_a_bcl_module_in_a_dir_it_should_be_loaded");
}

var When_require_a_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it = function() {
	__log("TEST: When_require_a_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it");
	
	var module = require("./testModules/someDirModule");
	var moduleName = module.getModuleName();
	
	Assert(moduleName == "index.js", "FAILED: When_require_a_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it");
}

var When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it = function() {
	__log("TEST: When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it");
	
	var module = require("tests/testModules/someBclDirModule");
	var moduleName = module.getModuleName();
	
	Assert(moduleName == "bclindex.js", "FAILED: When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it");
}

var When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_package_json_inside_it = function() {
	__log("TEST: When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_package_json_inside_it");
	
	var module = require("tests/testModules/someModule");
	var value123 = module.value123;
	
	Assert(value123 === 123, "FAILED: When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_package_json_inside_it");
}

When_extending_a_class_two_times();
When_extending_a_class_two_times_with_no_extend_names();
When_implementing_an_interface_with_new_the_overrides_should_work();

//LOG("ALL PASSED");
//fail();

When_extending_a_class_two_times_without_second_implementation_object();
When_extending_a_class_and_calling_super_toString();
When_accessing_a_static_field_on_a_javascript_instance_it_should_work();
When_accessing_static_members_on_an_extended_class();

When__calling_super_method_using_the_prototype_property_of_a_function_it_should_call_the_super_method();
When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method();
When__calling_super_method_using_the_prototype_property_of_a_extended_function_it_should_call_the_super_method2()



When_extending_a_class_and_calling_super_method_it_should_work();

//@@@
//When_accessing_a_property_it_should_call_the_get_and_set_methods_respectivelly();
//When_accessing_a_bool_property_it_should_call_the_is_and_set_methods_respectivelly();

//When_calling_instance_and_static_member_with_same_name_the_calls_should_succeed(); //TODO: Enable when supporting isStatic in MethodResolver
When_calling_toString_on_an_java_object_that_has_overriden_toString_in_js_it_should_call_the_js_method();
When_calling_toString_on_an_java_object_it_should_call_the_java_method();
When_a_java_method_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type();
When_a_java_field_returns_object_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type();
When_a_java_argument_is_passed_to_js_that_needs_js_instance__it_should_create_the_instance_according_to_the_actual_return_type();
When_calling_instanceof_it_should_work();
When_calling_instanceof_on_method_argument_it_should_work();
When_calling_instanceof_on_method_result_it_should_work();
When_calling_instanceof_on_field_result_it_should_work();
When_accessing_class_property_on_a_extended_class_it_should_return_the_extended_class();
When_using_global_in_a_module_global_should_be_defined();
When_using_package_json_should_load_module();
When_require_bcl_module_it_should_be_loaded();
When_require_a_module_it_should_be_loaded();
When_require_a_bcl_module_in_a_dir_it_should_be_loaded();
When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it();
When_require_a_bcl_module_that_is_a_directory_name_it_should_load_the_package_json_inside_it();
When_require_a_module_that_is_a_directory_name_it_should_load_the_index_js_inside_it();
When_calling_instanceof_on_interface_it_should_work();

TestRequireDirName();
TestRequireFileName();
TestGarbageCollection();
TestWorkingWithJavaArrayDoesNotMakeMemoryLeak();
TestConstructorOverride();
TestConstructorOverrideOnTypeWithInitMethod();
TestRequire();
TestArrays();
TestArrayLengthPropertyIsNumber();
TestCreationOfLocationListener();
TestInnerClassCreation();
TestNestedClassCreation();
TestCallMethodOnAnObjectReturnedAsObjectWithoutMetadata();
TestGetFieldOnAnObjectReturnedAsObjectWithoutMetadata();
TestCallMethodOnAnObjectPassedAsParameterInOverriddenMethodAsAnObjectWithoutMetadata();
TestAccessArrayElementAsObjectWithoutMetadata();
TestCallMethodThatReturnsNull();
TestCallMethodThatReturnsNullString();
TestAccessNullField();
TestAccessNullArrayElement();
TestCallMethodWithIntVarArg();
TestCallMethodWithCharVarArg();
TestCallMethodWithObjectVarArg();
TestCanInheritFromClassInAndroidSupportLibrary();
TestCallMethodWithByteParameter();
TestCanCallStaticMethodThroughBaseClass();
TestUseFieldThatIsArray();
TestCanAssignArrayToField();
TestCallMethodThatReturnsLong();
TestCallMethodWithLongParameter();
TestCallMethodWithLongCastArgument();
TestCallToStringOfNativeScriptLongObject();
TestCallMethodWithMinAndMaxLongValues();
TestCallMethodWithLongParameterWithNumberObject();
TestCallMethodWithByteParameter();
TestCallMethodWithFloatParameter();
TestCallMethodWithShortParameter();
TestCallMethodWithBooleanParameter();
TestThrowJavaScriptExceptionWhenCannotResolveJavaMethod();
TestThrowJavaScriptExceptionWhenCannotResolveJavaConstructor();
TestThrowJavaScriptExceptionWhenSetArrayRefElementWithNakedJavaScriptObject();
TestThrowJavaScriptExceptionWhenSetArrayRefElementWithJavaScriptPrimitive();
TestThrowJavaScriptExceptionWhenCreateJavaObjectWithNakedJavaScriptObject();
TestThrowJavaScriptExceptionWhenCallJavaMethodWithNakedJavaScriptObject();
TestThrowJavaScriptExceptionWhenCallJavaMethodWithJavaScriptPrimitiveWhenJavaRefIsExpected();
TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsDeleted();
TestThrowJavaScriptExceptionWhenOverideMethodImplementationIsOverwritten();
// ART does not allow partiallly implemented interfaces (as expected)
//TestThrowJavaScriptExceptionWhenPartiallyImplementedInterfaceIsUsed();
TestThrowJavaScriptExceptionWhenImplementationObjectIsUsedToExtendMoreThanOneClass();
TestThrowJavaScriptExceptionWhenPassBooleanArgumentWhereNotExpected();
TestThrowJavaScriptExceptionWhenPassNumberArgumentWhereNotExpected();
TestCallProctedMethodDefinedAsAbstractAndThenOverwritten();
TestCharSequenceReturnValueIsTreatedAsStringWhenItIsString();
TestObjectReturnValueIsTreatedAsStringWhenItIsString();
TestCanFindImplementationObjectWhenCreateExtendedObjectFromJava();
TestCanCallMethodThatReturnsArrayOfInterfaces();
TestCanParseSignatureWithTypesThatContainsCapitalLettersForPrimitiveTypes();
TestCanCallToStringOnClassProxy();