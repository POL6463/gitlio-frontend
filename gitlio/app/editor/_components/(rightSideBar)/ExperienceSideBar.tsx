import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";


export default function ExperienceSideBar() {
    return (
        <div className="flex flex-col w-96">
            <div className="flex w-96 flex-row justify-start items-center mb-6">
                <div className="text font-bold">CONTENT</div>
                <button className="btn btn-sm bg-transparent border-none shadow-none ml-6">
                    <FaRegSquarePlus className="size-5"/>
                </button>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="타이틀"
                           className="input-md w-full max-w-xs mr-6 bg-neutral-200 rounded-xl"/>
                    <button className="btn bg-transparent border-none shadow-none">
                        <FaRegTrashAlt className="size-5"/>
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-4 bg-neutral-200 rounded-md"/>
                    <div className="mr-4">~</div>
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-10 bg-neutral-200 rounded-md"/>
                    <div className="text mr-4">진행중</div>
                    <input type="checkbox" defaultChecked className="checkbox mr-3"/>
                </div>
                <div className="flex flex-row items-center justify-between items-stretch">
                    <textarea className="textarea w-full textarea-md bg-neutral-200 resize-none min-h-32" placeholder="상세 설명"></textarea>
                </div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="타이틀"
                           className="input-md w-full max-w-xs mr-6 bg-neutral-200 rounded-xl"/>
                    <button className="btn bg-transparent border-none shadow-none">
                        <FaRegTrashAlt className="size-5"/>
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-4 bg-neutral-200 rounded-md"/>
                    <div className="mr-4">~</div>
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-10 bg-neutral-200 rounded-md"/>
                    <div className="text mr-4">진행중</div>
                    <input type="checkbox" defaultChecked className="checkbox mr-3"/>
                </div>
                <div className="flex flex-row items-center justify-between items-stretch">
                    <textarea className="textarea w-full textarea-md bg-neutral-200 resize-none min-h-32"
                              placeholder="상세 설명"></textarea>
                </div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="타이틀"
                           className="input-md w-full max-w-xs mr-6 bg-neutral-200 rounded-xl"/>
                    <button className="btn bg-transparent border-none shadow-none">
                        <FaRegTrashAlt className="size-5"/>
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-4 bg-neutral-200 rounded-md"/>
                    <div className="mr-4">~</div>
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-10 bg-neutral-200 rounded-md"/>
                    <div className="text mr-4">진행중</div>
                    <input type="checkbox" defaultChecked className="checkbox mr-3"/>
                </div>
                <div className="flex flex-row items-center justify-between items-stretch">
                    <textarea className="textarea w-full textarea-md bg-neutral-200 resize-none min-h-32"
                              placeholder="상세 설명"></textarea>
                </div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="타이틀"
                           className="input-md w-full max-w-xs mr-6 bg-neutral-200 rounded-xl"/>
                    <button className="btn bg-transparent border-none shadow-none">
                        <FaRegTrashAlt className="size-5"/>
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-4 bg-neutral-200 rounded-md"/>
                    <div className="mr-4">~</div>
                    <input type="text" placeholder="YY.MM"
                           className="input-sm w-24 mr-10 bg-neutral-200 rounded-md"/>
                    <div className="text mr-4">진행중</div>
                    <input type="checkbox" defaultChecked className="checkbox mr-3"/>
                </div>
                <div className="flex flex-row items-center justify-between items-stretch">
                    <textarea className="textarea w-full textarea-md bg-neutral-200 resize-none min-h-32 mb-40"
                              placeholder="상세 설명"></textarea>
                </div>
            </div>

        </div>
    )
}