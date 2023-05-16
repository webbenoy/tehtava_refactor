import React, {FC, useState, FormEvent, ChangeEvent} from "react";
import styles from "./addProductForm.module.css";

interface IFormProps {
	onSubmit(payload: object): void,
}

export const AddProductForm: FC<IFormProps> = ({onSubmit}) => {
	const [title, setTitle] = useState<string>(''),
	[price, setPrice] = useState<string>(''),
	[description, setDescription] = useState<string>('');

	const resetValues = () => {
		setTitle('');
		setPrice('');
		setDescription('');
	}

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.target;
		setTitle(value);
	}

	const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.target;

		setPrice(value);
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		const { value } = e.target;

		setDescription(value);
	}

  	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!title) {
			alert("Your product needs a title");

			return;
		}

		if (!price) {
			alert("Your product needs a price");

			return;
		}

		if (!description) {
			alert("Your product needs some content");

			return;
		}

		onSubmit({
			title,
			description,
			price,
		});
		
		resetValues();
  	};

  return (
    <form
		className={styles.form}
		onSubmit={handleSubmit}
		>
      <label className={styles.label} htmlFor="title">Product title: *</label>

      <input
        placeholder="Title..."
        value={title}
		name="title"
		id="title"
        className={styles.input}
		onChange={handleTitleChange}
      />

      <label className={styles.label} htmlFor="price">Product price: *</label>

      <input
        placeholder="Price..."
        value={price}
		name="price"
		id="price"
        className={styles.input}
		onChange={handlePriceChange}
      />
	<label className={styles.label} htmlFor="description">Product description: *</label>
      <textarea
        placeholder="Start typing product description here..."
        value={description}
		name="description"
		id="description"
        className={styles.textarea}
		onChange={handleDescriptionChange}
      />
		
      <button type="submit">Add a product</button>
    </form>
  );
};
