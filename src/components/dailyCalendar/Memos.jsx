import {nanoid} from "nanoid";
import moment from "moment";
import {useEffect, useState} from 'react';

export default function Memos({memos}) {
    console.log(memos)
    let tag = []
     tag["check"] = false

    moment.locale('fr')
    const handleMemos = function (memos) {
        memos.map(function (memo) {
            if (memo["date"]) {

                memo["date"].map(function (memoDates) {
                    tag.push(
                        <div key={nanoid(8)}
                             className={`${memo["bgColor"]} font-bold text-sm`}>{ memo["title"] }</div>
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
                className="overflow-y-scroll h-[100px]">Mémos <br/>{tag}
            </div>}
        </>
    )
}
