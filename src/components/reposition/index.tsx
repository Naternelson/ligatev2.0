import { cloneElement, forwardRef, PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react"

export type RepositionItemProps = PropsWithChildren<{
    easingFn?: string, 
    /** A number in ms */
    transitionTime?: number, 
    /** Callback listener for when the transition is completed */
    onEndListener?: () => Promise<void>,
    onStartListener?: () => Promise<void>,
    onStateChange?: (state: null | "transitioning" | "completed") => void  
    render: JSX.Element
}>

/** 
 * A Controller Element, that watches for changes in it's render element's position, and smoothly transitions the element to the new position 
 * 
 * The rendered Element must implement the React.forwardRef function in order to operate. 
 * The rendered Element should be in `position:relative` to function properly 
 * */
export const RepositionItem = (props: RepositionItemProps) => {
    const {render} = props 
    const [boundingBox, setBB] = useState<DOMRect | undefined>()
    const [previousBox, setPB] = useState<DOMRect | undefined>()
    const ref = useRef<HTMLElement>() 
    
    useLayoutEffect(() => {
        if(!ref.current) return 
        const newRect = ref.current.getBoundingClientRect() 
        if(!hasChangedRect(boundingBox, newRect)) return 
        setPB(boundingBox) 
        setBB(newRect) 
    })
    // useEffect(() => {
        
    // }, [transitionState])
    useEffect(()=> {
        // if(!isMutable(ref)) return 
        const {current} = ref
        if(!current || !previousBox || !boundingBox) return 
        const changeInX = previousBox.left - boundingBox.left 
        const changeInY = previousBox.top - boundingBox.top 
        /** If no postional change has occured, do not animate */
        if(!changeInX && !changeInY) return
        requestAnimationFrame(() => {
            /** 
             * Update the style to transform the new positioned element back to its previous position 
             * Then remove that translation and let the css animate it back
             * */
            current.style.transform = `translateY(${changeInY}px) translateX(${changeInX}px)`
            current.style.transition = "transform 0s"
            requestAnimationFrame(() =>  {
                const {transitionTime, easingFn, onEndListener, onStartListener, onStateChange } = props
                const time = typeof transitionTime === "number" ? `${transitionTime}ms` : !!transitionTime ? transitionTime : "500ms"
                const easing = easingFn || "ease"
                current.style.transform = ""
                current.style.transition =`transform ${time} ${easing}`
                if(onStartListener) onStartListener() 
                if(onStateChange) onStateChange("transitioning")
                if(onEndListener) setTimeout(() => {
                    onEndListener()
                    if(onStateChange) onStateChange("completed")
                }, (typeof transitionTime === "number" ? transitionTime : 500))
            })
        })
    }, getRectDeps(previousBox, boundingBox))
    return cloneElement(render, {ref})
}

const hasChangedRect = (previous:DOMRect|undefined, newRect: DOMRect | undefined) => {
    const states = [
        previous?.left === newRect?.left, 
        previous?.top === newRect?.top 
    ]
    return states.some(s => !s)
}


const getRectDeps = (...boxes:Array<DOMRect | undefined>) => {
    return boxes.map(box => [box?.left, box?.top]).flat() 
}
