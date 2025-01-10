import BgRemove from "./bg-remove";
import BgReplace from "./bg-replace";
import GenRemove from "./gen-remove";

export default function ImageTools() {
    return (
        <>
            <GenRemove />
            <BgRemove />
            <BgReplace />
        </>
    )
}