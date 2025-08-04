import { useEffect } from "react"
import { idm } from "../utils/indexeddb_manager"
import { Toast } from "../utils/toast"
import { nm } from "../utils/note_manager"

export function Textarea() {

    const update_textarea = (key) => {
        idm.findItem(key).then(r => {
            if (r == undefined) Toast.error(`No note with key of ${key}`)
            else {
                document.getElementById("textarea").value = r.content
                document.getElementById("textarea").focus()
            }
        })
    }

    const onType = (value) => {
        nm.updateNote(nm.getCurrent(), nm.getKeys()[nm.getCurrent()].details.name, value).then(r => nm.updateKeys())
    }

    const countLeading = (line) => {
        let c = 0;
        for (let char of line) {
            if (char == "\t") c += 1
            else break
        }

        return c
    }

    const getLineSelected = (pos, start) => {
        let el = document.getElementById("textarea")
        let value = el.value

        let arr = value.split("\n")

        let counter = start
        for (let i = 0; i < arr.length; i++) {
            if (counter > pos) {
                return i - 1
            }

            counter += arr[i].length + 1
        }

        return arr.length - 1
    }

    const isCursorAtStartOfLine = (pos) => {
        let el = document.getElementById("textarea")
        let value = el.value

        let arr = value.split("\n")

        let counter = 0
        for (let i = 0; i < arr.length; i++) {
            if (counter >= pos) {
                return counter == pos
            }

            counter += arr[i].length + 1
        }

        return false
    }

    const newline = () => {
        let el = document.getElementById("textarea")
        let value = el.value
        let arr = value.split("\n")
        let posStart = el.selectionStart

        let line = getLineSelected(posStart, 1)

        if (line == -1) {
            document.execCommand("insertText", false, "\n")
        } else {
            document.execCommand("insertText", false, "\n" + "\t".repeat(countLeading(arr[line])))
        }
    }

    const indent = () => {
        let el = document.getElementById("textarea")
        let value = el.value
        let arr = value.split("\n")

        let posStart = el.selectionStart
        let posEnd = el.selectionEnd

        let startLine = getLineSelected(posStart, 0)
        let endLine = getLineSelected(posEnd, 0)

        if (startLine == endLine) {
            if (isCursorAtStartOfLine(posStart)) {
                document.execCommand("insertText", false, "\t" + arr[startLine])
                el.setSelectionRange(posStart, posEnd + 1)
            }
            else document.execCommand("insertText", false, "\t")
        } else {
            let content = ""

            for (let i = startLine; i <= endLine; i++) {
                content += "\t" + arr[i] + "\n"
            }

            let newStartPos = 0
            let newEndPos = 0

            for (let i = 0; i < startLine; i++) {
                newStartPos += arr[i].length + 1
            }

            for (let i = 0; i <= endLine; i++) {
                newEndPos += arr[i].length + 1
            }

            el.setSelectionRange(newStartPos, newEndPos - 1)
            document.execCommand("insertText", false, content.substring(0, content.length - 1))
            el.setSelectionRange(newStartPos, newEndPos + (endLine - startLine))
        }
    }

    const unindent = () => {
        let el = document.getElementById("textarea")
        let value = el.value
        let arr = value.split("\n")

        let posStart = el.selectionStart
        let posEnd = el.selectionEnd

        let startLine = getLineSelected(posStart, 0)
        let endLine = getLineSelected(posEnd, 0)


        let newStartPos = 0
        let newEndPos = 0

        for (let i = 0; i < startLine; i++) {
            newStartPos += arr[i].length + 1
        }

        for (let i = 0; i <= endLine; i++) {
            newEndPos += arr[i].length + 1
        }

        if (startLine == endLine) {
            if (arr[startLine].startsWith("\t")) {
                el.setSelectionRange(newStartPos, newEndPos - 1)
                document.execCommand("insertText", false, arr[startLine].substring(1, arr[startLine].length))
                el.setSelectionRange(newStartPos, newEndPos - 2)
            }

        } else {
            let content = ""
            let shouldExecute = false

            for (let i = startLine; i <= endLine; i++) {
                content += (arr[i].startsWith("\t") ? arr[i].substring(1, arr[i].length) : arr[i]) + "\n"
                if (arr[i].startsWith("\t")) shouldExecute = true 
            }

            if (shouldExecute) {
                el.setSelectionRange(newStartPos, newEndPos - 1)
                document.execCommand("insertText", false, content.substring(0, content.length - 1))
                el.setSelectionRange(newStartPos, newStartPos + content.substring(0, content.length - 1).length)
            }
        }
    }

    useEffect(() => {
        idm.init().then(r => {
            nm.init_notes(update_textarea)
        })

        const indentation = (e) => {
            if (e.keyCode == 9 && e.shiftKey) {
                e.preventDefault();
                unindent()
            } else if (e.keyCode == 9) {
                e.preventDefault();
                indent()
            } else if (e.keyCode == 13) {
                e.preventDefault();
                newline()
            }
        };

        document.getElementById("textarea").addEventListener("keydown", indentation);
        return () => document.getElementById("textarea").removeEventListener("keydown", indentation);
    })

    return (
        <textarea
            id="textarea"
            autoFocus
            className="font-mono h-[calc(100vh-1px)] w-full outline-none border-none resize-none m-0 bg-inherit p-4 text-lg text transition-all"
            onChange={(e) => onType(e.target.value)}
        ></textarea>
    )
}