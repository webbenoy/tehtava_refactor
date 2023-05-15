import React, {FC, useRef, FormEvent} from "react";
import { Button } from "../../base/button";
import styles from "./addProductForm.module.css";

interface IFormProps {
	onSubmit(payload: object): void,
}

export const AddProductForm: FC<IFormProps> = ({onSubmit}) => {
  	const formRef = useRef<HTMLFormElement>(null),
  	titleRef = useRef<HTMLInputElement>(null),
  	priceRef = useRef<HTMLInputElement>(null),
  	descriptionRef = useRef<HTMLTextAreaElement>(null);

  	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!titleRef.current?.value) {
			alert("Your product needs a title");

			return;
		}

		if (!descriptionRef.current?.value || !priceRef.current?.value) {
			alert("Your product needs some content");

			return;
		}

		onSubmit({
			title: titleRef.current && titleRef.current.value,
			description: descriptionRef.current && descriptionRef.current.value,
			price: priceRef.current && priceRef.current.value,
		});

		formRef.current?.reset();
  	};

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
      <span className={styles.label}>Product title: *</span>

      <input
        ref={titleRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        ref={priceRef}
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
      />

      <textarea
        ref={descriptionRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};
