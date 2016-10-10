"use strict";

function mapComment (comment) {
    var value = comment.value.trim();
    if (comment.type === "Block") {
        return "/* " + value + " */\n";
    }
    return "// " + value + "\n";
}

module.exports = function (result, comments) {
    // it would be great to find a better way to attach comments, 
    // this solution simply puts all of the comments at the top of the file
    // so you at least do not lose them
    // there's the ast, result, comments, token etc. at your disposal
    comments = comments.map(mapComment).join("");
    return comments + result;
};
