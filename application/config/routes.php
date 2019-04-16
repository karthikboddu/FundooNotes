<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Welcome';
$route['addtion']='Welcome/addtion';





$route['register'] = 'UserData/register';
$route['loginto'] = 'UserData/login';
$route['forgotpass'] = 'UserData/forgotpass';
$route['fetchemail'] = 'UserData/fetchemail';
$route['resetpass'] = 'UserData/resetpassword';
$route['createnotes'] = 'Notes/createNotes';
$route['fetchnotes'] = 'Notes/fetchNotes';
$route['updatenote'] = 'Notes/updateNotes';
$route['setcolor'] = 'Notes/setColor';
$route['fetchremnotes'] = 'Reminder/fetchReminderNotes';
$route['trashnote'] = 'Notes/noteTrash';
$route['deletenote'] = 'Notes/deleteNote';
$route['restorenote'] = 'Notes/noteRestore';
$route['fetchreminder'] ='Reminder/fetchReminderNotes';
$route['fetcharchive'] = 'Archive/fetchArchive';
$route['unarchive'] = 'Archive/unarchive';
$route['setlabel'] ='Label/addLabel';
$route['fetchlabel'] = 'Label/fetchLabel';
$route['changedatetime'] ='Notes/changetimedate';
$route['socialLogin'] = 'UserData/socialLogin';
$route['labelsfet'] ='Notes/labelsfetch';
$route['fetchnote'] = 'Notes/notefetch';
$route['labeldelete'] = 'Label/deleteLabel';
$route['noteimage'] = 'Notes/noteImage';

$route['testapi'] = 'UserData/test';
$route['testlog'] = 'UserData/testlogin';

$route['doct'] = 'Doctrinetest/user';
$route['prod'] = 'Doctrinetest/product';


$route['subb']='Welcome/sub';
$route['insert'] = 'Signin/insert';
$route['sigin'] = 'Signin/login';
$route['login'] = 'Signin/loginto';



$route['find']['get']='Product/find_all';
$route['create'] = 'Product/create';
$route['findbyid/(:num)'] = 'Product/find/$1';
$route['update'] = 'Product/update';
$route['delete/(:num)'] = 'Product/delete/$1';


$route['redis'] = 'Redis/index';
// $route['delete']['delete']='Product/find_all';
// $route['product/(:any)'] = 'index.php/product';
// $route['product/(:num)'] = 'product/find/$1';
// $route['product']['get'] = 'product/find_all';
// $route['delete/(:num)'] = 'Product/delete';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;






/**
 * Doctrine
 */

 $route['registerD'] = 'UserController/register';
 $route['noteInsertD'] ='UserController/insertNotes';
 $route['labelsAddD'] = 'UserController/addLabel';
 $route['getLabelsD'] = 'UserController/getLabel';
 $route['fetchNotesD'] = 'NotesController/fetchNotes';  
 $route['loginD'] = 'UserController/login';
 $route['labelsmap'] = 'UserController/labelmap';
 $route['fetchlabelnotes'] = 'UserController/labelbyid';