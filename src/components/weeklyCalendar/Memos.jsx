import {nanoid} from "nanoid";
import moment from "moment";
import {useEffect, useState} from 'react';

export default function Memos({memos}) {
    let tag = []
    tag["check"] = false
    let memoCheck = false

    moment.locale('fr')
    const handleMemos = function (memos) {
        memos.map(function (memo) {
            if (memo["date"]) {

                memo["date"].map(function (memoDates) {
                    tag.push(
                        <div key={nanoid(8)}
                             className={`${memo["bgColor"]} font-bold text-sm`}>{moment(memoDates, "DD-MM-YYYY").format("dddd") + " " + moment(memoDates, "DD-MM-YYYY").date() + " " + moment(memoDates, "DD-MM-YYYY").format("MMMM") + " " + memo["title"] + "  "}</div>
                    )
                })
            }
        })
        if (tag.length > 0) {
            tag["check"] = true
        }
        return tag
    }
    return (
        <>
            {handleMemos(memos)['check'] && <div
                className="overflow-y-scroll max-h-[80px]">{tag}
            </div>}
        </>
    )
}
