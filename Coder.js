/*
 * How to use it
 * <div>
 * [code lan=gral|cobol|net|sql]
 * (Your code here, be sure to add it on HTML edition mode)
 * [/code]
 * </div>
 * <div id="b_ei_codegenerator">
 * <script type="text/javascript">makeCode();</script></div>
 *
 * - To make text snippets, use ~"text~" or ~'text~'
 * - To remark a line, use [hilite] at the begining of the line
 *
 * You can attach several [code] snippets, inside same div or on different div
 */

var version = "2.0";
var currIn = 0;
var mc = '';
var opc = false;
var opd = false;
var opk = [];
var opi = 0;
var opt = false;
var opT = false;
var opx = '/*';
var opX = '/**';
var opy = '//';
var ops = '*/';
var prf = ['class="b_ei_opc"', 'class="b_ei_opd"', 'class="b_ei_opk"', 'class="b_ei_opt"', 'class="b_ei_opT"', 'class="b_ei_opy"'];
var prn = [];
var prt = [];
var prnI = 0;
var prtI = 0;
opk[opi] = false;


/*
 * g function.
 * 
 * handler for getElementById
 */
function g(id) {
  return document.getElementById(id);
}

/*
 * trm function.
 * 
 * returns a left-right trimmed string
 */
function trm(t) {
  if (t === '') {
    return t;
  }

  tx = 0;
  ty = (t.length - 1);

  while ((t.charAt(tx) === ' ' || tx == ty) && ++tx);
  while ((t.charAt(ty) === ' ' || ty === 0) && --ty);

  return t.substring(tx, ++ty);
}


/*
 * spc function.
 * 
 * replaces all spaces with html entity
 */
function spc(t) {
  return replaceAll(t, ' ', '&nbsp;');
}

/*
 * fmtN function.
 * 
 * Formats a number making it "l" positions long, with 0 padding
 */
function fmtN(t, l) {
  //fr: padding
  let fr = '';

  //tl: length of t
  let tl = t.toString().length;

  //fi: index
  let fi = 0;

  //if t have the same or bigger length, return
  if (tl >= l) {
    return t;
  }

  //we keep adding '0' padding until fi = (l - tl)
  while ((fr += '0') && (++fi < (l - tl)));

  //padding + number
  return fr + t;
}

/*
 * replaceAll function.
 * 
 * Replaces all occurences of "b" y "r" on text "t".
 */
function replaceAll(t, b, r) {
  while (t.toString().indexOf(b) != -1) {
    t = t.toString().replace(b, r);
  }

  return t;
}

/*
 * makeCode function.
 * 
 * Main function to be called.
 */
function makeCode() {
  //mcT: parent node on which the function has been called.
  let mcT = g('b_ei_codegenerator').parentNode;

  //mcx: temp array to search specific node
  let mcx = mcT.id.split('-');

  //recursively searching for a "post" or "body" node.
  //---TO DO: THIS DOES NOT WORK ON MOBILE--//
  while ((mcx.length < 2) && (mcx[0] != 'post' && mcx[1] != 'body')) {
    mcT = mcT.parentNode;
    mcx = mcT.id.split('-');
  }

  //once here, we have our source code located
  //we get on mct the code
  let mct = mcT.innerHTML.split('[code');

  //we get on mcl the different code snippets
  let mcl = mct.length;

  //mcr will be to code to insert
  let mcr = '';
  let mci = 0;

  //for each part, treat them
  for (mci = 0; mci < mcl; mci++) {
    let mca = mct[mci].split('[/code]');
    let mcal = mca.length;

    if (mca.length == 2 && trm(mca[0]).substring(0, 3) == 'lan') {
      //we have a code part here, treat it
      mca[0] = make(mca[0]);
    }

    //then join it to the rest
    mcr += mca.join('');
  }

  //finally, insert it on mcT
  mcT.innerHTML = mcr;
}

/*
 * make function
 *
 * Gets the kind of code, then format it
 */
function make(t) {
  //mc: kind of code used
  mc = getClass(t);

  if (mc == 'b_ei_cobol') {
    //opy: comment char
    opy = '*';

    //prn: reserved words
    prn = ['ACCEPT', 'ACCESS', 'ADD', 'ADDRESS', 'ALL', 'ALSO', 'ALTER', 'AND', 'AREA', 'ASCENDING', 'ASSIGN', 'AT', 'AUTHOR', 'AUTO', 'BEEP', 'BEFORE', 'BINARY', 'BY', 'CALL', 'CLOSE', 'COBOL', 'CODE', 'COL', 'COLUMN', 'COMMA', 'COMMIT', 'COMP', 'COMP-3', 'COMPUTE', 'CONFIGURATION', 'CONTINUE', 'CONVERTING', 'COPY', 'CORR', 'CORRESPONDING', 'COUNT', 'CURRENT', 'CURSOR', 'DATA', 'DATE', 'DATE-COMPILED', 'DATE-WRITTEN', 'DAY', 'DAY-OF-WEEK', 'DB', 'DB-ACCESS-CONTROL-KEY', 'DB-DATA-NAME', 'DB-EXCEPTION', 'DB-FORMAT-NAME', 'DB-RECORD-NAME', 'DB-SET-NAME', 'DB-STATUS', 'DBCS', 'DBCS-EDITED', 'DEBUGGING', 'DECIMAL-POINT', 'DEFAULT', 'DELETE', 'DELIMITED', 'DELIMITER', 'DEPENDING', 'DESCENDING', 'DISPLAY', 'DIVIDE', 'DIVISION', 'DOWN', 'DROP', 'DUPLICATE', 'DUPLICATES', 'DYNAMIC', 'EBCDIC', 'EGI', 'ELSE', 'EMPTY', 'ENABLE', 'END', 'END-ACCEPT', 'END-ADD', 'END-CALL', 'END-COMPUTE', 'END-DELETE', 'END-DISPLAY', 'END-DIVIDE', 'END-EVALUATE', 'END-IF', 'END-MULTIPLY', 'END-PERFORM', 'END-READ', 'END-REWRITE', 'END-SEARCH', 'END-START', 'END-STRING', 'END-SUBTRACT', 'END-UNSTRING', 'END-WRITE', 'ENTRY', 'ENVIRONMENT', 'EQUAL', 'EQUALS', 'ERASE', 'ERROR', 'EVALUATE', 'EVERY', 'EXCEEDS', 'EXIT', 'EXTEND', 'FALSE', 'FD', 'FETCH', 'FILE', 'FILE-CONTROL', 'FILES', 'FILLER', 'FINAL', 'FIND', 'FINISH', 'FIRST', 'FOR', 'FORMAT', 'FROM', 'FULL', 'FUNCTION', 'GET', 'GIVING', 'GO', 'GOBACK', 'HIGH-VALUE', 'HIGH-VALUES', 'I-O', 'I-O-CONTROL', 'ID', 'IDENTIFICATION', 'IF', 'IN', 'INDEX', 'INDEXED', 'INITIAL', 'INITIALIZE', 'INPUT', 'INPUT-OUTPUT', 'INSPECT', 'INSTALLATION', 'INTO', 'INVALID', 'IS', 'KEEP', 'KEY', 'LABEL', 'LAST', 'LENGTH', 'LIKE', 'LIMIT', 'LIMITS', 'LINE', 'LINES', 'LINKAGE', 'LOW-VALUE', 'LOW-VALUES', 'MERGE', 'MODE', 'MODIFIED', 'MODIFY', 'MOVE', 'MULTIPLE', 'MULTIPLY', 'NEGATIVE', 'NEXT', 'NO', 'NO-ECHO', 'NONE', 'NOT', 'NULL', 'NULLS', 'NUMBER', 'NUMERIC', 'NUMERIC-EDITED', 'OJBECT-COMPUTER', 'OCCURS', 'OF', 'OFF', 'OMITTED', 'ON', 'ONLY', 'OPEN', 'OPTIONAL', 'OR', 'ORDER', 'ORGANIZATION', 'OTHER', 'OUTPUT', 'OVERFLOW', 'PERFORM', 'PICTURE', 'PLUS', 'PIC', 'POINTER', 'POSITION', 'POSITIVE', 'PROCEDURE', 'PROCESS', 'PROGRAM-ID', 'PROGRAM', 'READ', 'RECURSIVE', 'RECORD', 'RECORD-NAME', 'RECORDS', 'REDEFINES', 'REFERENCE', 'REFERENCES', 'RELATIVE', 'RELEASE', 'RENAMES', 'REPEATED', 'REPLACE', 'REPLACING', 'REQUIRED', 'RESERVE', 'RESET', 'RETURN', 'RETURNING', 'RETURN-CODE', 'REVERSED', 'REWIND', 'REWRITE', 'RF', 'RH', 'RIGHT', 'RIGHT-JUSTIFY', 'ROLLBACK', 'ROLLING', 'ROUNDED', 'RUN', 'SAME', 'SCREEN', 'SD', 'SEARCH', 'SECTION', 'SELECT', 'SENTENCE', 'SEQUENTIAL', 'SET', 'SIGN', 'SIZE', 'SORT', 'SOURCE', 'SOURCE-COMPUTER', 'SPACE', 'SPACES', 'SPECIAL-NAMES', 'STANDARD', 'START', 'STARTING', 'STATUS', 'STOP', 'STRING', 'SUBTRACT', 'SUM', 'TABLE', 'TALLYING', 'TAPE', 'TEXT', 'THAN', 'THEN', 'THROUGH', 'THRU', 'TIME', 'TIMES', 'TITLE', 'TO', 'TOP', 'TRANSACTION', 'TRUE', 'TYPE', 'TYPEDEF', 'UNIT', 'UNSTRING', 'UNTIL', 'UP', 'UPDATE', 'UPON', 'USAGE', 'USAGE-MODE', 'USE', 'USING', 'VALID', 'VALIDATE', 'VALUE', 'VALUES', 'VARYING', 'WAIT', 'WHEN', 'WITH', 'WITHIN', 'WORDS', 'WORKING-STORAGE', 'WRITE', 'ZERO', 'ZEROES', 'ZERO-FILL', 'ZEROS'];

    //we stack the class to each instance of prn
    for (mi = 0; mi < prn.length; mi++) {
      prt[mi] = 'b_ei_token';
    }
  } else if (mc == 'b_ei_net') {
    //opy: comment char
    opy = "'";

    //prn: reserved words
    prn = ['AddHandler', 'AddressOf', 'Alias', 'And', 'AndAlso', 'As', 'Boolean', 'ByRef', 'Byte', 'ByVal', 'Call', 'Case', 'Catch', 'CBool', 'CByte', 'CChar', 'CDate', 'CDec', 'CDbl', 'Char', 'CInt', 'Class', 'CLng', 'CObj', 'Const', 'Continue', 'CSByte', 'CShort', 'CSng', 'CStr', 'CType', 'CUInt', 'CULng', 'CUShort', 'Date', 'Decimal', 'Declare', 'Default', 'Delegate', 'Dim', 'DirectCast', 'Do', 'Double', 'Each', 'Else', 'ElseIf', 'End', 'EndIf', 'Enum', 'Erase', 'Error', 'Event', 'Exit', 'False', 'Finally', 'For', 'Friend', 'Function', 'Get', 'GetType', 'GetXMLNamespace', 'Global', 'GoSub', 'GoTo', 'Handles', 'If', 'If()', 'Implements', 'Imports (.NET Namespace and Type)', 'Imports (XML Namespace)', 'In', 'Inherits', 'Integer', 'Interface', 'Is', 'IsNot', 'Let', 'Lib', 'Like', 'Long', 'Loop', 'Me', 'Mod', 'Module', 'MustInherit', 'MustOverride', 'MyBase', 'MyClass', 'Namespace', 'Narrowing', 'New', 'Next', 'Not', 'Nothing', 'NotInheritable', 'NotOverridable', 'Object', 'Of', 'On', 'Operator', 'Option', 'Optional', 'Or', 'OrElse', 'Overloads', 'Overridable', 'Overrides', 'ParamArray', 'Partial', 'Private', 'Property', 'Protected', 'Public', 'RaiseEvent', 'ReadOnly', 'ReDim', 'REM', 'RemoveHandler', 'Resume', 'Return', 'SByte', 'Select', 'Set', 'Shadows', 'Shared', 'Short', 'Single', 'Static', 'Step', 'Stop', 'String', 'Structure', 'Sub', 'SyncLock', 'Then', 'Throw', 'To', 'True', 'Try', 'TryCast', 'TypeOf', 'Variant', 'Wend', 'UInteger', 'ULong', 'UShort', 'Using', 'When', 'While', 'Widening', 'With', 'WithEvents', 'WriteOnly', 'Xor'];

    //we stack the class to each instance of prn
    for (mi = 0; mi < prn.length; mi++) {
      prt[mi] = 'b_ei_token';
    }
  } else if (mc == 'b_ei_sql') {
    //opy: comment char
    opy = '-';

    //prn: reserved words
    prn = ['ADD', 'EXCEPT', 'PERCENT', 'ALL', 'EXEC', 'PLAN', 'ALTER', 'EXECUTE', 'PRECISION', 'AND', 'EXISTS', 'PRIMARY', 'ANY', 'EXIT', 'PRINT', 'AS', 'FETCH', 'PROC', 'ASC', 'FILE', 'PROCEDURE', 'AUTHORIZATION', 'FILLFACTOR', 'PUBLIC', 'BACKUP', 'FOR', 'RAISERROR', 'BEGIN', 'FOREIGN', 'READ', 'BETWEEN', 'FREETEXT', 'READTEXT', 'BREAK', 'FREETEXTTABLE', 'RECONFIGURE', 'BROWSE', 'FROM', 'REFERENCES', 'BULK', 'FULL', 'REPLICATION', 'BY', 'FUNCTION', 'RESTORE', 'CASCADE', 'GOTO', 'RESTRICT', 'CASE', 'GRANT', 'RETURN', 'CHECK', 'GROUP', 'REVOKE', 'CHECKPOINT', 'HAVING', 'RIGHT', 'CLOSE', 'HOLDLOCK', 'ROLLBACK', 'CLUSTERED', 'IDENTITY', 'ROWCOUNT', 'COALESCE', 'IDENTITY_INSERT', 'ROWGUIDCOL', 'COLLATE', 'IDENTITYCOL', 'RULE', 'COLUMN', 'IF', 'SAVE', 'COMMIT', 'IN', 'SCHEMA', 'COMPUTE', 'INDEX', 'SELECT', 'CONSTRAINT', 'INNER', 'SESSION_USER', 'CONTAINS', 'INSERT', 'SET', 'CONTAINSTABLE', 'INTERSECT', 'SETUSER', 'CONTINUE', 'INTO', 'SHUTDOWN', 'CONVERT', 'IS', 'SOME', 'CREATE', 'JOIN', 'STATISTICS', 'CROSS', 'KEY', 'SYSTEM_USER', 'CURRENT', 'KILL', 'TABLE', 'CURRENT_DATE', 'LEFT', 'TEXTSIZE', 'CURRENT_TIME', 'LIKE', 'THEN', 'CURRENT_TIMESTAMP', 'LINENO', 'TO', 'CURRENT_USER', 'LOAD', 'TOP', 'CURSOR', 'NATIONAL', 'TRAN', 'DATABASE', 'NOCHECK', 'TRANSACTION', 'DBCC', 'NONCLUSTERED', 'TRIGGER', 'DEALLOCATE', 'NOT', 'TRUNCATE', 'DECLARE', 'NULL', 'TSEQUAL', 'DEFAULT', 'NULLIF', 'UNION', 'DELETE', 'OF', 'UNIQUE', 'DENY', 'OFF', 'UPDATE', 'DESC', 'OFFSETS', 'UPDATETEXT', 'DISK', 'ON', 'USE', 'DISTINCT', 'OPEN', 'USER', 'DISTRIBUTED', 'OPENDATASOURCE', 'VALUES', 'DOUBLE', 'OPENQUERY', 'VARYING', 'DROP', 'OPENROWSET', 'VIEW', 'DUMMY', 'OPENXML', 'WAITFOR', 'DUMP', 'OPTION', 'WHEN', 'ELSE', 'OR', 'WHERE', 'END', 'ORDER', 'WHILE', 'ERRLVL', 'OUTER', 'WITH', 'ESCAPE', 'OVER', 'WRITETEXT'];

    //we stack the class to each instance of prn
    for (mi = 0; mi < prn.length; mi++) {
      prt[mi] = 'b_ei_token';
    }
  } else if (mc == 'b_ei_gral') {
    //prn: reserved words
    prn = ['abstract', 'continue', 'for', 'new', 'switch', 'null', 'assert', 'default', 'if', 'package', 'synchronized', 'boolean', 'do', 'goto', 'private', 'this', 'break', 'double', 'implements', 'protected', 'throw', 'byte', 'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return', 'transient', 'true', 'catch', 'extends', 'int', 'short', 'try', 'false', 'char', 'final', 'interface', 'static', 'void', 'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while'];

    //we stack the class to each instance of prn
    for (mi = 0; mi < prn.length; mi++) {
      prt[mi] = 'b_ei_token';
    }

    //we stack common function names
    prn.push('assert', 'tolower', 'toupper', 'isalnum', 'isalpha', 'isascii', 'iscntrl', 'isdigit', 'isgraph', 'islower', 'isprint', 'ispunct', 'isspace', 'isupper', 'isxdigit', 'toascii', 'errno', 'DBL_DIG', 'DBL_EPSILON', 'DBL_MANT_DIG', 'DBL_MAX', 'DBL_MAX_10_EXP', 'DBL_MAX_EXP', 'DBL_MIN', 'DBL_MIN_10_EXP', 'DBL_MIN_EXP', 'FLT_DIG', 'FLT_EPSILON', 'FLT_MANT_DIG', 'FLT_MAX', 'FLT_MAX_10_EXP', 'FLT_MAX_EXP', 'FLT_MIN', 'FLT_MIN_10_EXP', 'FLT_MIN_EXP', 'FLT_RADIX', 'FLT_ROUNDS', 'LDBL_DIG', 'LDBL_EPSILON', 'LDBL_MANT_DIG', 'LDBL_MAX', 'LDBL_MAX_10_EXP', 'LDBL_MAX_EXP', 'LDBL_MIN', 'LDBL_MIN_10_EXP', 'LDBL_MIN_EXP', 'CHAR_BIT', 'CHAR_MIN', 'CHAR_MAX', 'INT_MIN', 'INT_MAX', 'LONG_MIN', 'LONG_MAX', 'SCHAR_MIN', 'SCHAR_MAX', 'SHRT_MIN', 'SHRT_MAX', 'UCHAR_MAX', 'USHRT_MAX', 'UINT_MAX', 'ULONG_MAX', 'localeconv', 'setlocale', 'LC_ALL', 'LC_COLLATE', 'LC_CTYPE', 'LC_MONETARY', 'LC_NUMERIC', 'LC_TIME', 'NULL', 'lconv', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'cosh', 'exp', 'fabs', 'floor', 'fmod', 'frexp', 'ldexp', 'log', 'log10', 'modf', 'pow', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'HUGE_VAL', 'longjmp', 'setjmp', 'jmp_buf', 'raise', 'signal', 'SIGABRT', 'SIGFPE', 'SIGILL', 'SIGSEGV', 'SIGTERM', 'SIG_DFL', 'SIG_ERR', 'SIG_IGN', 'sig_atomic_t', 'va_arg', 'va_end', 'va_start', 'va_list', 'offsetof', 'ptrdiff_t', 'size_t', 'wchar_t', 'clearerr', 'fclose', 'feof', 'ferror', 'fflush', 'fgetc', 'fgetpos', 'fgets', 'fopen', 'formato', 'fprintf', 'fputc', 'fputs', 'fread', 'freopen', 'fscanf', 'fscanf2', 'fseek', 'fsetpos', 'ftell', 'fwrite', 'getc', 'getchar', 'gets', 'perror', 'printf', 'putc', 'putchar', 'puts', 'remove', 'rename', 'rewind', 'scanf', 'setbuf', 'setvbuf', 'sprintf', 'sscanf', 'tmpfile', 'tmpnam', 'ungetc', 'vfprintf', 'vprintf', 'vsprintf', 'BUFSIZ', 'EOF', 'FILENAME_MAX', 'FOPEN_MAX', 'L_tmpnam', 'SEEK_CUR', 'SEEK_END', 'SEEK_SET', 'stderr', 'stdin', 'stdout', 'TMP_MAX', '_IOFBF', '_IOLBF', '_IONBF', 'FILE', 'fpos_t', 'abort', 'abs', 'atexit', 'atof', 'atoi', 'atol', 'bsearch', 'calloc', 'div', 'exit', 'free', 'getenv', 'labs', 'ldiv', 'malloc', 'mblen', 'mbstowcs', 'mbtowc', 'qsort', 'rand', 'realloc', 'srand', 'strtod', 'strtol', 'strtoul', 'system', 'wctomb', 'EXIT_FAILURE', 'EXIT_SUCCESS', 'MB_CUR_MAX', 'RAND_MAX', 'div_t', 'ldiv_t', 'memchr', 'memcmp', 'memcpy', 'memmove', 'memset', 'strcat', 'strchr', 'strcmp', 'strcoll', 'strcpy', 'strcspn', 'strerror', 'strlen', 'strncat', 'strncmp', 'strncpy', 'strpbrk', 'strrchr', 'strspn', 'strstr', 'strtok', 'strxfrm', 'asctime', 'clock', 'ctime', 'difftime', 'gmtime', 'localtime', 'mktime', 'strftime', 'time', 'CLOCKS_PER_SEC', 'clock_t', 'time_t', 'tm');

    //we stack the class for each new instance of prn
    for (; mi < prn.length; mi++) {
      prt[mi] = 'b_ei_function';
    }
  }

  //get the length of both prn and prt
  prnI = prn.length;
  prtI = prt.lenght;

  //prepare the return
  mr = '<div class="b_ei_code"><div class="b_ei_code_raw"><span onclick="getRaw(this.parentNode.parentNode)">Get Raw</span></div>' + getFormatted(t.substring(currIn)) + '</div>';
  return mr;
}

/*
 * getClass function
 *
 * Gets the kind of code based on the header [code lan=xxx]
 */
function getClass(t) {
  //gco: indicates if we're on the lan section
  let gco = false;

  let gcl = t.length;
  let gcr = 'b_ei_';

  //iterate for each char of "t"
  for (gci = 0; gci < gcl; gci++) {
    gcc = t.charAt(gci);

    //it's the end of header? then return
    if (gcc == ']') {
      //we update the start of the actual code
      currIn = ++gci;
      return gcr;
    }

    //are we on the lan section, and not on a quote? add the char to the class name
    if (gco && gcc != '"') {
      gcr += gcc;
    }

    //if we're on the "=", we start to add chars to the class name
    if (gcc == '=') {
      gco = true;
    }
  }

  //if no value found, return void
  return '';
}

/*
 * getFormatted function
 *
 * Formats each line of actual code
 */
function getFormatted(t) {
  //gft: each line of code
  let gfa = t.split("\n");

  //gfl: number of lines
  let gfl = gfa.length - 1;

  //gfr: return text
  let gfr = '';

  //for each non-empty line, format it
  for (gfi = 0; gfi < gfl; gfi++) {
    if (gfa[gfi] === '') {} else {
      gfr += '<div><span class="b_ei_code_counter">' + fmtN(gfi, 4) + '</span><span class="b_ei_code_line">' + fmt(spc(gfa[gfi])) + '</span></div>';
    }
  }

  return gfr;
}


/*
 * fmt function
 *
 * Formats a line of actual code
 */
function fmt(t) {
  //applied class to the current line
  let fma = '';
  let fml = t.length;

  //fmr: return value
  let fmr = '';

  //fmo: open span counter
  let fmo = 0;
  let fmp = true;

  //prf contains class names
  /*            0                   1                   2                   3                   4                   5*/
  //var prf = ['class="b_ei_opc"', 'class="b_ei_opd"', 'class="b_ei_opk"', 'class="b_ei_opt"', 'class="b_ei_opT"', 'class="b_ei_opy"'];
  if (mc == 'b_ei_gral') {
    //is main class gral code?
    if (opc) {
      //are we on a doc block (/**)?
      fma = prf[0];
      fmo++;
    } else if (opd) {
      //are we on a comment block (/*)?
      fma = prf[1];
      fmo++;
    }
  }

  //I guess this was a To Do, as opt and opT are always false
  /*if (opt) {
      fma = prf[3];
      fmo++;
  } else if (opT) {
      fma = prf[4];
      fmo++;
  }*/

  //Search for specific "hilite" lines
  let fmh = t.split('[hilite]');

  if (fmh.length == 2) {
    //if the line starts with "hilite", we add specific style then end (do not treat the line)
    return '<span class="b_ei_hilite">' + fmh.join('') + '</span>';
  }

  //create the main span with fma
  fmr = '<span ' + fma + '>';

  //iterate for each char on the line
  for (fmi = 0; fmi < fml; fmi++) {
    fmx = t.charAt(fmi);

    //specific block checkin for "gral" coding
    if (mc == 'b_ei_gral') {
      if (t.substring(fmi, (opX.length + fmi)) == opX && (!opd)) {
        /* We are on a doc block (/**).
         * 
         * This only happens on "gral", as "cobol", "net", and "sql" have
         * no block comment (have to comment each line.
         */

        //toggle on the documentation switch
        opd = true;

        //create dedicated span
        fmr += '<span ' + prf[1] + '>';

        //increase span counter
        fmo++;
      } else if (t.substring(fmi, (opx.length + fmi)) == opx && (!opc)) {
        /* We are on a comment block (/*).
         * 
         * This only happens on "gral", as "cobol", "net", and "sql" have
         * no block comment (have to comment each line.
         */
        opc = true;
        fmr += '<span ' + prf[0] + '>';
        fmo++;
      } else if (t.substring(fmi, (ops.length + fmi)) == ops) {
        /* We are on a closing doc/comment block (* /).
         * 
         * This only happens on "gral", as "cobol", "net", and "sql" have
         * no block comment (have to comment each line.
         */
        opd = false;
        opc = false;
        fmr += ops + '</span>';
        fmo--;
        fmp = false;
      }

      //I guess this is another To Do, as opi and opk are merely informational here
      //I think I putted this to do a (+) function to collapse code maybe?
      if (fmx == '{') {
        /* We are on a opening function block ({).
         * 
         * This only happens on "gral", as "cobol", "net", and "sql" have
         * no block comment (have to comment each line.
         */
        opi++;

        //we indicate that we are on a new identation block
        opk[opi] = true;
      } else if (fmx == '}') {
        /* We are on a closing function block ({).
         * 
         * This only happens on "gral", as "cobol", "net", and "sql" have
         * no block comment (have to comment each line.
         */

        //we indicate that we are exiting the identation block
        opk[opi] = false;
        opi--;
      }
    }

    //are we on a commented line?
    if (t.substring(fmi, (opy.length + fmi)) == opy) {
      if (opc || opd) {} else {
        //only apply comment color if we're not on a comment/doc block
        fmr += '<span ' + prf[5] + '>';
        fmo++;
      }
    }

    //if we're not on a closing comment/doc block, add the char, as we already putted it out
    if (fmp) {
      fmr += fmx;
    }
  }

  //for each opened span, add a closing span
  for (fmi = 0; fmi < fmo; fmi++) {
    fmr += '</span>';
  }

  //ending treatment for html coherence
  if (fmo <= 0) {
    //to indicate the quote char, we use ~"text~" or ~'text~'

    //get all pieces for double quotted text
    fmS = fmr.split('~"');
    fmSi = fmS.length;

    //fmSS: final text
    fmSS = fmS[0];

    //for each piece of text
    for (fmi = 1; fmi < fmSi; fmi++) {
      if (fmi % 2 == 1) {
        //fmi is odd, that means we put the "opening" quote and start a text span
        fmSS += "\"<span " + prf[3] + ">" + fmS[fmi];
      } else {
        //fmi is even. We close the text span and put the "ending" quote
        fmSS += "</span>\"" + fmS[fmi];
      }
    }

    //we repeat the same operation for simple quoted text
    fmS = fmSS.split("~'");
    fmSi = fmS.length;
    fmSS = fmS[0];

    for (fmi = 1; fmi < fmSi; fmi++) {
      if (fmi % 2 == 1) {
        fmSS += '\'<span ' + prf[4] + '>' + fmS[fmi];
      } else {
        fmSS += '</span>\'' + fmS[fmi];
      }
    }

    //override fmr with fmSS
    fmr = fmSS;

    //add span for reserved words (prn / ptr)
    for (fmi = 0; fmi < prnI; fmi++) {
      //xxx: reserved word
      //yyy: associated class

      //replace " xxx " by " <span class="yyy">xxx</span> "
      fmr = replaceAll(fmr, '&nbsp;' + prn[fmi] + '&nbsp;', '&nbsp;<span class="' + prt[fmi] + '">' + prn[fmi] + '</span>&nbsp;');

      //replace "xxx " by "<span class="yyy">xxx</span> "
      fmr = replaceAll(fmr, prn[fmi] + '&nbsp;', '<span class="' + prt[fmi] + '">' + prn[fmi] + '</span>&nbsp;');

      //replace " xxx" by " <span class="yyy">xxx</span>"
      fmr = replaceAll(fmr, '&nbsp;' + prn[fmi], '&nbsp;<span class="' + prt[fmi] + '">' + prn[fmi] + '</span>');

      //replace "." by "<span class="yyy">.</span> " --> This is just for COBOL
      fmr = replaceAll(fmr, '.' + prn[fmi], '.<span class="' + prt[fmi] + '">' + prn[fmi] + '</span>');
    }
  }

  //return
  return fmr;
}

/*
 * getRaw function.
 * 
 * Gets the code snippet on text format.
 */
function getRaw(t) {
  grt = [];
  grt.push('/**\r\n');
  grt.push(' * Code downloaded via codemaker\r\n');
  grt.push(' * Author: David Sole (DoHITB)\r\n');
  grt.push(' * Version: ' + version + '\r\n');
  grt.push(' * Find DoHITB on Twitter @dohitb\r\n');
  grt.push(' * DoHITB website: escepticismoilustrado.blogspot.com\r\n');
  grt.push(' */\r\n\r\n');

  //get all the code lines
  gra = t.getElementsByClassName('b_ei_code_line');
  grl = gra.length;

  //for each line, add it to grt
  /*
   * replace &gt;   by >
   * replace &lt;   by <
   * replace &amp;  by &
   * replace &nbsp; by _
   * replace tags   by null
   */
  for (gri = 0; gri < grl; gri++) {
    grt.push(gra[gri].innerHTML.replace(/\&nbsp;/g, ' ').replace(/(<([^>]+)>)/ig, '').replace(/\&gt;/g, '>').replace(/\&lt;/g, '<').replace(/\&amp;/g, '&') + '\r\n');
  }


  dlf(new Blob(grt, {
    type: 'text/plain'
  }));
}

/*
 * dlf function.
 * 
 * Downloads the code snippet.
 */
function dlf(b) {
  dlfr = new FileReader();
  dlfr.onload = function (event) {
    dlfs = document.createElement('a');
    dlfs.href = event.target.result;
    dlfs.target = '_blank';
    dlfs.download = 'rawcode.txt';
    dlfc = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    dlfs.dispatchEvent(dlfc);
    (window.URL || window.webkitURL).revokeObjectURL(dlfs.href);
  };
  dlfr.readAsDataURL(b);
}
