import * as Form from "@radix-ui/react-form";
import { useRouter } from "@raula/router";
import { FormEvent, useCallback, useState } from "react";
import { Loader } from "../components/Loader";
import { useToast } from "../components/Toast";
import { tasks } from "../db/task";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const NewTaskPage = (): JSX.Element => {
  const toast = useToast();
  const { router } = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const data = Object.fromEntries(new FormData(event.currentTarget));
      await sleep();
      tasks.push({
        id: tasks.length + 1,
        title: data.title as string,
        description: data.description as string,
      });
      toast("Create successfully!");
      setLoading(false);
      router.push("/");
    },
    [router, toast]
  );
  return (
    <main>
      <h1 className="text-2xl text-neutral-200 font-bold mb-8">
        Create a new task
      </h1>
      <Form.Root className="space-y-10" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Form.Field className="grid" name="title">
            <div className="flex items-baseline justify-between">
              <Form.Label className="font-medium leading-[35px] text-mauve1">
                Title
              </Form.Label>
              <Form.Message
                className="text-sm text-mauve1 opacity-[0.8]"
                match="valueMissing"
              >
                Please enter a title
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-whiteA3 shadow-whiteA8 hover:shadow-whiteA9 focus:shadow-whiteA11 inline-flex py-3 appearance-none items-center justify-center rounded px-3 leading-none text-mauve1 shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9"
                type="text"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid" name="description">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-mauve1">
                Description
              </Form.Label>
              <Form.Message
                className="text-[13px] text-mauve1 opacity-[0.8]"
                match="valueMissing"
              >
                Please enter a description
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className="box-border w-full bg-whiteA4 shadow-whiteA8 hover:shadow-whiteA9 focus:shadow-whiteA11  inline-flex py-3 appearance-none items-center justify-center rounded px-3 leading-none text-mauve1 shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9 resize-none"
                required
              />
            </Form.Control>
          </Form.Field>
        </div>
        <Form.Submit asChild>
          <button
            className="box-border text-white justify-center rounded bg-plum11 hover:bg-plum10 leading-none py-2 px-4 text-sm shadow-[0_2px_10px] shadow-whiteA8 flex items-center disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            {loading && <Loader />}
            Create Task
          </button>
        </Form.Submit>
      </Form.Root>
    </main>
  );
};
