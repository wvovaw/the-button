import { useEffect, useRef, useState } from "react";
import { userAuth } from "@/hooks/useAuth";
import { getRecordByUserId } from "@/api/services/getRecordByUserId";
import { updateRecord } from "@/api/services/updateRecord";
import { createRecord } from "@/api/services/createRecord";
import { type RecordData } from "@/api/types";

export function useGame() {
  const authCtx = userAuth();
  const [record, setRecord] = useState<RecordData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    score: 0,
    attempts: 0,
  });
  const hasMounted = useRef(false);

  const click = () => {
    const P = Math.round(Math.random() * 100);
    if (P < state.score) {
      setState({
        score: 0,
        attempts: state.attempts + 1,
      });
    } else
      setState({
        ...state,
        score: state.score + 1,
      });
  };

  useEffect(() => {
    const init = async () => {
      console.log("Run init effect");
      setLoading(true);
      try {
        if (authCtx?.user) {
          setRecord(await getRecordByUserId(authCtx.user.id));
        }
      } catch (e: unknown) {
        console.log(e);
        setLoading(false);
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    const update = async () => {
      console.log("Run update effect");

      try {
        if (record) {
          if (state.score > record?.highScore)
            setRecord(await updateRecord({ attempts: state.attempts, newScore: state.score }));
        } else setRecord(await createRecord({ score: state.score }));
      } catch (e: unknown) {
        console.log(e);
      }
    };

    if (hasMounted.current) update();
    else hasMounted.current = true;
  }, [hasMounted, state.score]);

  return { attempts: state.attempts, score: state.score, record, isLoading, click };
}
