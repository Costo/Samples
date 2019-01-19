# Image to Excel converter

Built with Blazor. <a href="http://code.vincentcos.tel/blazor/">Demo here</a>


###  Notes

* Had to use EPPlus instead of Open XML SDK due to this issue: https://github.com/mono/mono/issues/8216
* Decoding PNGs fail because of the same issue
* Performance is very poor
* The browser window freezes during the conversion

