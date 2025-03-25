import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Toast } from '@/app/toast'
import { useState } from 'react'

export function SearchSetting(name, type) {
	let search_options = []

	let default_search = 'https://duckduckgo.com/?t=ffab&q='

	const export_setting = () => {
		return get()
	}

	const import_setting = (import_object) => {
		search_options = import_object["options"]
		default_search = import_object["default"]
	}

	const load = () => {
		if (localStorage.getItem(name) === null || localStorage.getItem(name) === "null") {
            localStorage.setItem(name, JSON.stringify(export_setting()))
        } else {
			import_setting(JSON.parse(localStorage.getItem(name)))
		}
	}

	const update_local = () => {
		localStorage.setItem(name, JSON.stringify(export_setting()))
	}

	const add = (value) => {
		value.push(Date.now() + search_options.length)
		search_options.push(value)

		return value
	}

	const remove = (id) => {
		let return_val;
		for (let i = 0; i < search_options.length; i++) {
			let option_id = search_options[i][3]

			if (option_id == id) {
				return_val = search_options.splice(i, 1)
			}
		}

		return return_val
	}

	const get = () => {
		return {
			options: search_options,
			default: default_search
		}
	}

	const render = (key, r) => {
		const [data, setData] = useState(search_options)
		const [defaultSearch, setDefault] = useState(default_search)

		const update_default = (e) => {
            let value = e.target.parentNode.children[0].value
			default_search = value

			update_local()
			setDefault(value)

            Toast.success("Saved")
		}

		const update_value = (e, index) => {
			let parent = e.target.parentNode.parentNode.parentNode.children
			let shortcut = parent[0].children[1].value
			let description = parent[1].children[1].value
			let color = parent[2].children[1].children[1].value

			let id = search_options[index][3]

			search_options[index] = [shortcut, description, color, id]
			update_local()

			setData((prev) =>
				prev.map((e, i) => (i == index ? search_options[index] : e))
			)

            Toast.success("Saved")
		}

		const delete_value = (index, id) => {
			remove(id)
			update_local()

			setData((prev) => prev.filter((e, i) => i != index))
		}

		const add_value = () => {
			setData([...data, add(['', '', '#ffffff'])])
			update_local()
		}

		return r ? <div className="hidden" key={key}></div> : (
			<div key={key}>
				<p className="text-lg font-semibold">{name}</p>

				<Accordion type="multiple" className="w-[90%] mx-2">
					<div className="flex justify-between content-center my-2">
						<p className="content-center text-sm">Default Search: </p>
                        <div className="flex items-center content-center">
                            <input
                                type="text"
                                placeholder="Default Search"
                                className="bg-inherit w-full h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none text-sm mr-2 ml-auto"
                                defaultValue={defaultSearch}
                            ></input>
                            <Button onClick={(e) => update_default(e)} variant="outline">Save</Button>
                        </div>
					</div>

					{data.length == 0 ? 
						<div className="mt-8 mb-6">
							<p className="text-center text-sm">There seems to be nothing here... Try adding a shortcut?</p>
						</div>
					: data.map((value, index) => {
						let [shortcut, destination, color, id] = value

						return (
							<AccordionItem key={index + 10} value={index + 10}>
								<AccordionTrigger>
									<p className="overflow-hidden text-ellipsis whitespace-nowrap">
										Shortcut - {shortcut}
									</p>
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex justify-between content-center">
										<p className="content-center">
											Shortcut:
										</p>
										<input
											type="text"
											placeholder="Shortcut (\v\ for user value)"
											className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
											defaultValue={shortcut}
										></input>
									</div>
									<div className="flex justify-between content-center my-3">
										<p className="content-center">
											Destination:
										</p>
										<input
											type="text"
											placeholder="Destination (\v\ for user value)"
											className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
											defaultValue={destination}
										></input>
									</div>
									<div className="flex justify-between content-center mb-3">
										<p className="content-center">Color:</p>
										<div className="flex items-center">
											<div
												className="h-8 w-8 ml-auto mr-2 rounded-md border-2 border-[#595959]"
												style={{
													backgroundColor: color
												}}
											></div>
											<input
												type="text"
												placeholder="Color"
												className="bg-inherit w-1/2 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
												defaultValue={color}
											></input>
										</div>
									</div>
									<div className="flex justify-between content-center">
										<div></div>
										<div>
											<Button
												onClick={(e) =>
													update_value(e, index)
												}
												className="mr-4"
												variant="outline"
											>
												Save
											</Button>
											<Button
												onClick={() =>
													delete_value(index, id)
												}
												variant="destructive"
											>
												Delete
											</Button>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						)
					})}
					<div className="w-full flex justify-center mt-5">
						<Button onClick={() => add_value()} variant="outline">
							Add
						</Button>
					</div>
				</Accordion>
			</div>
		)
	}

	return {
		"export": export_setting,
		"import": import_setting,
		"load": load,
		"add": add,
		"remove": remove,
		"get": get,
		"render": render,
		"name": name,
		"type": type
	}
}

