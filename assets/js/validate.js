;(function(w,d,undefined){
    "use strict";

    var MY = w.MY || {};

    MY.Validate = function() {
        // an array to store all error messages
        var errors = [];
        
        // a variable to store all validation rules
        var all_rules = {};
        
        // custom error messages
        var messages = {
            'min'          : '{1} integer value must not be less than {0}',
            'max'          : '{1} integer value must not be greater than {0}',
            'exact'        : '{1} integer value must be {0}',
            'maxLength'    : '{1} value must must be less than {0}',
            'minLength'    : '{1} value must must be greater than {0}',
            'exactLength'  : '{1} value must be exactly {0} characters',
            'required'     : '{1} is required',
            'matches'      : '{1} must match with {0}',
            'isAlpha'      : '{1} must be an alphabetic value',
            'isNumeric'    : '{1} must be a numeric value',
            'isAlphaNumeric': '{1} must be an alpha-numeric value',
            'isAlphaDash'  : '{1} must be an alphanumeric, underscore, or dash value',
            'isInteger'    : '{1} must be an integer value',
            'isHex'        : '{1} must be a hexadecimal value',
            'isBase64'     : '{1} must be a base64 value',
            'isIP'         : '{1} must be a valid IP address',
            'isEmail'      : '{1} must be a valid email address',
            'isUrl'        : '{1} must be a valid url',
            'noWhitespace' : '{1} must not contain any whitespace'
        };
        
        // a variable that will hold all the validation methods
        var v = this;
        
        // get all fields from a form
        v.getFormFields = function(form_id) {
            var i, len, data = {}, fields;
            if (typeof form_id === 'object') {
                fields = form_id.elements;
            } else {
                fields = d.getElementById(form_id).elements;
            }
            
            for(i = 0, len = fields.length; i < len; i++) {
                if(fields[i].name) {
                    data[fields[i].name] = fields[i].value;
                }
            }
            return data;
        };

        // prepare value for validation
        v.validate = function(value, field_name) {
            // this makes validate method chainable
            var that = this;
            
            // a variable to hold a single validation rule
            var rules = {};

            // add new value to be validated
            all_rules[field_name] = rules;
            
            // {1} will be replaced with field_name
            var msg = function(msg_name, val) {
                var m;
                // get the error message
                m = messages[msg_name];
                
                // if field_name and value are specified replace {1} and {0} from the message
                // otherwise just replace {1} with value
                if (field_name && val) {
                    m = m.replace('{1}', field_name);
                    m = m.replace('{0}', val);
                } else {
                    m = m.replace('{1}', field_name);
                }
                return m;
            };

            // add a new rule to the validation rules
            var addRule = function(name, val) {
                if(val) {
                    rules[name] = val;
                } else {
                    rules[name] = true;
                }
            };

            // from this point all the methods are validation rules
            that.min = function(val) {
                addRule('min', val);
                return that;
            };
            
            that.max = function(val) {
                addRule('max', val);
                return that;
            };

            that.exact = function(val) {
                addRule('exact', val);
                return that;
            };
            
            that.maxLength = function(val) {
                addRule('maxLength', val);
                return that;
            };

            that.minLength = function(val) {
                addRule('minLength', val);
                return that;
            };
            
            that.exactLength = function(val) {
                addRule('exactLength', val);
                return that;
            };

            that.required = function() {
                addRule('required');
                return that;
            };
            
            that.matches = function(val) {
                addRule('matches', val);
                return that;
            };
            
            that.isAlpha = function() {
                addRule('isAlpha');
                return that;
            };

            that.isNumeric = function() {
                addRule('isNumeric');
                return that;
            };

            that.isAlphaNumeric = function() {
                addRule('isAlphaNumeric');
                return that;
            };

            that.isAlphaDash = function() {
                addRule('isAlphaDash');
                return that;
            };
            
            that.isInteger = function() {
                addRule('isInteger');
                return that;
            };

            that.isHex = function() {
                addRule('isHex');
                return that;
            };
            
            that.isBase64 = function() {
                addRule('isBase64');
                return that;
            };

            that.isIP = function() {
                addRule('isIP');
                return that;
            };
            
            that.isEmail = function() {
                addRule('isEmail');
                return that;
            };

            that.isUrl = function() {
                addRule('isUrl');
                return that;
            };

            that.noWhitespace = function() {
                addRule('noWhitespace');
                return that;
            };
            
            return that;
        };
        
        v.setMsg = function(msg_name, new_msg) {
            messages[msg_name] = new_msg;
        };

        v.getErrors = function() {
            if(errors.length > 0) {
                return errors;
            }
            return false;
        };

        // checks if all validation rules are met
        v.isValid = function() {
            // value to be validated
            var val,
            // the name of the value to be validated, used for error messages
                field_name,
            // all validation rules for a single value
                rules,
            // a single rule
                rule;
            
            // clear all previous errors
            errors.length = 0;

            // iterate over all values that needs to be validated
            for (field_name in all_rules) {
                if (all_rules.hasOwnProperty(field_name)) {
                    // get the value using the field name
                    val = v.getFormFields(d.forms[0])[field_name];
                    // get all validation rules for this value
                    rules = all_rules[field_name];
                    
                    // iterate over all validation rules
                    for (rule in rules) {
                        if (rules.hasOwnProperty(rule)) {
                            switch (rule) {
                                case 'min':
                                    if(parseInt(val, 10) < rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'max':
                                    if(parseInt(val, 10) > rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'exact':
                                    if(parseInt(val, 10) !== rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'maxLength':
                                    if (val.length > rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'minLength':
                                    if (val.length < rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'exactLength':
                                    if (val.length !== rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'required':
                                    if(val === '' || val === undefined) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'matches':
                                    if(val !== rules[rule]) {
                                        errors.push(msg(rule, rules[rule]));
                                    }
                                    break;
                                case 'isAlpha':
                                    if(!/^[a-z]+$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isNumeric':
                                    if(!/^[0-9]+$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isAlphaNumeric':
                                    if(!/^[a-z0-9]+$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isAlphaDash':
                                    if(!/^[a-z0-9_-]+$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isInteger':
                                    if(!/^[\-+]?[0-9]+$/.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isHex':
                                    if(!/^[0-9a-f]+$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isBase64':
                                    if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isIP':
                                    if(!/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isEmail':
                                    if(!/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'isUrl':
                                    if(!/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                                case 'noWhitespace':
                                    if(/ /g.test(val)) {
                                        errors.push(msg(rule));
                                    }
                                    break;
                            }
                        }
                    }
                }
            }

            // clear all validation rules for the next validation
            all_rules = {};
            
            // if there are no errors return true
            if(errors.length > 0) {
                return false;
            }
            return true;
        };
    };
    
    w.MY = MY;
}(window, document));
