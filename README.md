# Coder.js
Javascript applet for prettyprint source code on blogger. It also allows to download source file

## How it works
Add it to your JS code on blogger (you can either download and cut/paste it, or just use "&lt;script type="text/javascript" src="https://dohitb.github.io/Coder.js/Coder.js"></script>, also add the custom CSS (code.css), and it's ready to use.

&lt;div><br />
[code lan=gral|cobol|net|sql]<br />
(Your code here, be sure to add it on HTML edition mode)<br />
[/code]<br />
&lt;/div>
&lt;div id="b_ei_codegenerator">&lt;script type="text/javascript">makeCode();&lt;/script>&lt;/div>

 - To make text snippets, use ~ before any quote (~", or ~')
 - To remark a line, use [hilite] at the begining of the line
 
You can attach several [code] snippets, inside same div or on different div

Then, when your post is viewed, "makeCode()" will made it's magic and pretty-print your source code :D
