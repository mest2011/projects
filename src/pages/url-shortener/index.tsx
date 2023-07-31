import {
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import "../ip/css/ip.css";
import React, { useState } from "react";
import toastr from "toastr";
import { InputError, InputText, MainContainer, Title } from "./style";

export const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [inputUrlError, setInputUrlError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(url);

    toastr.success("Dados copiados para área de transferência.", "Copiado!", {
      timeOut: 5000,
    });
  };

  //to-do integrar com backend
  const convertUrl = (): void => {
    if (isURL(url)) {
      setShortenedUrl(url);
    }
  };

  function removeInvalidURLCharacters(url: string) {
    const regex = /[^A-Za-z0-9\-._~:/?#@&()*,;=%]*/g;
    return url.replace(regex, "");
  }

  function isURL(url: string | undefined): boolean {
    if ((url ?? "").length === 0) return false;

    const urlPattern =
      /^(?:(https?|ftp):\/\/)?(?:www\.)?[A-Za-z0-9\-._~:/?#@!$&'()*+,;=]+(?:\.[A-Za-z0-9\-._~:/?#@!$&'()*+,;=]+)*$/;
    return urlPattern.test(url!) && url!.includes(".");
  }

  return (
    <>
      <MainContainer mt="5rem" className="font-barlow">
        <Box maxWidth={"35rem"} margin={"auto"} padding={1}>
          <Title variant="h1" style={{ fontSize: "24px" }}>
            Encurtador de URL
          </Title>
          <Box display="block" mt={4}>
            <Box display="block" justifyContent={"start"} flexWrap={"wrap"}>
              <Box display="flex" justifyContent={"space-between"} my={6}>
                <Box flex={"auto"} position={"relative"} mr={5}>
                  <InputText
                    value={url}
                    defaultValue=""
                    label="URL"
                    variant="outlined"
                    onChange={(value) => {
                      setUrl(
                        removeInvalidURLCharacters(value.currentTarget.value)
                      );
                      if (isURL(value.currentTarget.value)) {
                        setInputUrlError(undefined);
                      } else {
                        setInputUrlError("Url inválida!");
                      }
                    }}
                    error={!!inputUrlError}
                  />
                  <InputError>{inputUrlError}</InputError>
                </Box>
                <Box display={"flex"}>
                  {loading ? (
                    <>
                      <CircularProgress />
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={convertUrl}
                        style={{ backgroundColor: "var(--bg-color-secundary)" }}
                        disabled={!!inputUrlError}
                      >
                        Encurtar
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={shortenedUrl ? "block" : "none"}>
            <InputText
              value={shortenedUrl}
              defaultValue=" "
              label="Link encurtado"
              variant="outlined"
              onClick={copyToClipBoard}
            />
          </Box>
        </Box>
      </MainContainer>
    </>
  );
};
