## new msg
``` mermaid
flowchart TD
	START(["开始"])
	END(["结束"])
	START --> new_msg_received[/"input: chat, msg"/]

	new_msg_received --> DE__unfinished_msg{"判断 chat 是否有未完成的对话 (内存中)"}
	DE__unfinished_msg -->|Yes| Error_2["Error: chat 有未完成 msg"]
	Error_2 --> END
	
	DE__unfinished_msg -->|No| new_unfinished["标记 chat 为 unfinished"]
	new_unfinished --> GD__msg_list[/"获取最新 20 条 msg"/]

	GD__msg_list --> make_prompt["组装 prompt: system prompt, history msg, new msg"]
	make_prompt --> call_llm["调用 llm"]
	call_llm --> respond["respond stream"]
	respond --> drop_unfinished["标记 chat 为 finished"]
	drop_unfinished --> save_msg["保存 msg"]
	save_msg --> END
```
