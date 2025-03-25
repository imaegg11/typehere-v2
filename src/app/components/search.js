export function SearchBar(props) {

    const { searchSettings, ...rest } = props 

    return (
        <input id="search-bar" type="text" autoComplete="off" autoFocus placeholder="Search" onKeyUp={(e) => search_function(e, searchSettings)}
            className="bg-inherit w-full h-10 border-2 border-gray-750 select-none rounded-3xl px-6  transition focus-within:outline-none focus-within:shadow-[0_1px_6px_0_var(--shadow-color)] hover:shadow-[0_1px_6px_0_var(--shadow-color)]"
        ></input>
    )
}

function search_function(event, searchSettings) {

    const options = searchSettings["options"]
    const default_search = searchSettings["default"]
    
    const value = document.getElementById("search-bar").value
    let search_link = null 

    for (let option of options) {

        let [ input, output, color, id ] = option 

        if (!input.includes("\\v\\") && input == value) {
            search_link = output 
            console.log(color)
            event.target.style.setProperty("--shadow-color", color)
            break 
        }

        let prefix = input.substring(0, input.indexOf("\\v\\"))

        if (value.startsWith(prefix)) {

            let values = value.substring(input.indexOf("\\v\\"), value.length).split("|")

            let match = true;

            for (let v of values) {
                if (output.includes("\\v\\")) {
                    output = output.replace("\\v\\", v)
                } else {
                    match = false 
                }
            }

            if (match && !output.includes("\\v\\")) {
                search_link = output
                event.target.style.setProperty("--shadow-color", color)
                break 
            }
        }
    }

    if (search_link == null) {
        search_link = `${default_search}${value}` 
        event.target.style.setProperty("--shadow-color", "#71717a")
    }

    if (event.keyCode == 13) {

        if (event.ctrlKey) {
            window.open(search_link)
        } else {
            window.location.href = search_link
        }

        document.getElementById("search-bar").value = ""
    }

}