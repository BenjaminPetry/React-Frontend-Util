/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useState, useEffect } from "react";

import Tile from "../display/Tile";
import ActionBar from "../navigation/ActionBar";
import ErrorBar from "../display/ErrorBar";

import "./FormTile.css";

export default function FormTile({
  title = "",
  isPrimaryTitle = false,
  className = "",
  submitText = "Submit",
  error = null,
  children,
  disabled = false,
  onLoad = () => {
    return Promise.resolve();
  },
  onSubmit = (event) => {
    return Promise.resolve();
  },
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let _isMounted = true;
    setIsLoading(true);
    onLoad().finally((response) => {
      if (_isMounted) {
        setIsLoading(false);
      }
    });
    return function cleanup() {
      _isMounted = false;
    };
  }, [onLoad]);

  const submit = function (event) {
    event.preventDefault();
    setIsLoading(true);
    onSubmit().finally((response) => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={submit} className={className}>
      <Tile title={title} className={className} isPrimaryTitle={isPrimaryTitle}>
        {error === null ? null : <ErrorBar message={error}></ErrorBar>}
        {children}
        {submitText === "" ? null : (
          <ActionBar>
            <button
              className="primary"
              onClick={(event) => submit(event)}
              disabled={isLoading || disabled}
            >
              {submitText}
            </button>
          </ActionBar>
        )}
      </Tile>
    </form>
  );
}
