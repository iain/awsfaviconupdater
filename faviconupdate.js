// Define all the AWS services here
const SERVICES = [
	"acm",
	"amazon-mq",
	"apigateway",
	"appsync",
	"artifact",
	"athena",
	"batch",
	"billing",
	"cloudformation",
	"cloudfront",
	"cloudhsm",
	"cloudsearch",
	"cloudtrail",
	"cloudwatch",
	"codebuild",
	"codecommit",
	"codedeploy",
	"codepipeline",
	"codestar",
	//"cognito", // Amazon did this one!
	"config",
	"connect",
	"console",	
	"datapipeline",
	"deeplens",
	"directconnect",
	//"directoryservice", // Amazon did this one!
	"devicefarm",
	"discovery",
	"dms",
	"dynamodb",
	"ec2",
	"es",
	"efs",
	"ecs",
	"elasticache",
	"elastictranscoder",
	"elasticbeanstalk",
	"elasticmapreduce",
	"glacier",
	"gamelift",
	"glue",
	//"greengrass", // unique URL
	"guardduty",
	//"iam", // Amazon did this one!
	"iot",
	"iotsitewise",
	"importexport",
	"inspector",
	"kinesis",
	//"lambda", // Amazon did this one!
	"lex",
	"ls",
	//"macie", // unique URL
	"machinelearning",
	"managed-services",
	"mediaconvert",
	"medialive",
	"mediapackage",
	"mediastore",
	"mediatailor",
	"migrationhub",
	"mobilehub",
	"opsworks",
	"pinpoint",
	"polly",
	"rds",
	"redshift",
	"rekognition",
	"route53",
	"s3",
	"servermigration",
	"servicecatalog",
	"ses",
	"sns",
	"sqs",
	"states",
	"storagegateway",
	"sumerian",
	"systems-manager",
	"trustedadvisor",
	"swf",
	"waf",
	"workspaces",
	"workmail",
	"vpc",
	"xray",
	"zocalo",
];

// Look for the string blocks right after the 'amazon.com/' (ec2/s3/iam/ses/etc...)
let reg = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/*/g;

// Break the URL into parts and capture the string after the 'amazon.com/' as awsServiceName
let captureGroupArray = Array.from( document.URL.matchAll(reg) );
let awsServiceName = captureGroupArray[0][2];

// For Codesuite URLs (Codebuild/CodeDeploy/CodePipeline/etc...), we need to break the URL apart further to work
if (awsServiceName == 'codesuite') {
	awsServiceName = captureGroupArray[0][3];
}


// We have found a match in the URL!
if (SERVICES.includes(awsServiceName)) {

	let awsService = awsServiceName + ".png";

	if (awsService === 'cloudsearch' || awsService === 'swf') {

		// In these few cases, we need to actually add the favicon tag, because no one at Amazon did this yet!

		// Build the icon and shortcut icon tags so we can add them inside the head tag
		let iconNode = document.createElement('link');
		iconNode.setAttribute('rel', 'icon');
		iconNode.setAttribute('type', 'image/png');
		iconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
		let shortcutIconNode = document.createElement('link');
		shortcutIconNode.setAttribute('rel', 'shortcut icon');
		shortcutIconNode.setAttribute('type', 'image/png');
		shortcutIconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));

		// Add the tags we just made to the head tag

		document.getElementsByTagName('head')[0].appendChild(iconNode);
		document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);

	} else {

		// We have a favicon on the page, so just update the favicon tags

		// Get all the <link> tags
		let linkElements = document.getElementsByTagName('link');

		for (let i = 0; i < linkElements.length; i++) {

			// There are 2 tags that control the favicon.  Update them to be the correct favicon
			if (linkElements[i].getAttribute('rel') == 'icon') {
				linkElements[i].setAttribute('type', 'image/png');
				linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
			}

			if (linkElements[i].getAttribute('rel') == 'shortcut icon') {
				linkElements[i].setAttribute('type', 'image/png');
				linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService}`));
			}
		}
	}
}