import React, { useState } from "react";
import { createClient } from "../utils/airtable";
import { ClientDto, Client } from "../utils/types/client";
import styles from "./ClientForm.module.css";

const ClientForm = (
  { setClients }: { setClients: React.Dispatch<React.SetStateAction<Client[]>> }
) => {
  const [formData, setFormData] = useState<ClientDto>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(null); // Réinitialiser le message à chaque soumission

    try {
      console.log("form submitted");
      await createClient(formData, setClients); // Envoi de la demande
      setStatusMessage("Client ajouté avec succès !");
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value);
    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="firstname" className={styles.inputLabel}>
          Votre Prénom
        </label>
        <input
          type="text"
          name="firstname"
          placeholder="Votre Prénom"
          required
          onChange={handleChange}
          value={formData.firstname}
          className={styles.inputField}
        />

        <label htmlFor="lastname" className={styles.inputLabel}>
          Votre Nom
        </label>
        <input
          type="text"
          name="lastname"
          placeholder="Votre Nom"
          required
          onChange={handleChange}
          value={formData.lastname}
          className={styles.inputField}
        />

        <label htmlFor="email" className={styles.inputLabel}>
          Votre Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Votre Email"
          required
          onChange={handleChange}
          value={formData.email}
          className={styles.inputField}
        />

        <label htmlFor="phoneNumber" className={styles.inputLabel}>
          Votre Téléphone
        </label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Votre Téléphone"
          required
          onChange={handleChange}
          value={formData.phoneNumber}
          className={styles.inputField}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading} // Désactive le bouton pendant l'envoi
        >
          {loading ? "Envoi..." : "Vous ajouter"}
        </button>
      </form>

      {statusMessage && (
        <div
          className={styles.statusMessage}
          style={{
            color: statusMessage.includes("succès") ? "green" : "red",
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ClientForm;
