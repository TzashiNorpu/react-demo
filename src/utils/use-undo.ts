import {useCallback, useReducer, useState} from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const {past, present, future} = state;
  const {newPresent} = action;

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
  return state;
};


export const useUndo = <T>(initialPresent: T) => {
  /* const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]); */

  const [] = useReducer(undoReducer,{})

  const [state, setState] = useState({
    past: [] as T[],
    present: initialPresent as T,
    future: [] as T[]
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  // 没有用的外面的东西，所以不用指定依赖
  const undo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState;
      // if (!canUnd|) return;
      if (past.length === 0) return currentState;
      const previous = past[-1];
      const newPast = past.slice(0, past.length - 1);
      /*  setPast(newPast);
       setPresent(previous);
       setFuture([present, ...future]); */
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState;
      // if (!canUnd|) return;
      if (future.length === 0) return currentState;
      const next = future[0];
      const newFuture = future.slice(1);
      /*  setPast(newPast);
       setPresent(previous);
       setFuture([present, ...future]); */
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    })
  }, [])


  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const {past, present, future} = currentState;
      // if (!canUnd|) return;
      if (newPresent === present) return currentState;
      /*  setPast(newPast);
       setPresent(previous);
       setFuture([present, ...future]); */
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      // if (!canUnd|) return;
      /*  setPast(newPast);
       setPresent(previous);
       setFuture([present, ...future]); */
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  }, []);

  return [
    state,
    // {past, present, future},
    {set, reset, undo, redo, canUndo, canRedo}
  ] as const;

  /* useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>); 

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({type: UNDO}), []);

  const redo = useCallback(() => dispatch({type: REDO}), []);

  const set = useCallback(
    (newPresent: T) => dispatch({type: SET, newPresent}),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({type: RESET, newPresent}),
    []
  );

  return [state, {set, reset, undo, redo, canUndo, canRedo}] as const;
  */
};
