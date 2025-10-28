import React, { useRef } from "react";
import { Box, Grid } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonBulletedList,
  MenuButtonOrderedList,
  RichTextEditor,
} from "mui-tiptap";
import { CustomTypography } from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";
import DOMPurify from "dompurify"; // Import DOMPurify
import { labels } from "../../constants/settingsConstants"; // Import labels dari constants

const TermsConditionSection = ({
  formData,
  editMode,
  handleInputChange,
  handleEditClick,
  handleSaveClick,
}) => {
  const rteRef = useRef(null);

  // Handle perubahan Rich Text setiap kali ada update dari editor
  const handleRichTextChange = ({ editor }) => {
    const content = editor.getHTML();
    handleInputChange("termsConditions", content); // Update state dengan konten yang baru
  };

  // Membersihkan HTML dengan DOMPurify
  const sanitizedContent = formData.termsConditions
    ? DOMPurify.sanitize(formData.termsConditions)
    : "";

  return (
    <SectionAccordion
      title={labels.termsConditionsSectionTitle} // Menggunakan label dari constants
      subtitle={labels.termsConditionsSectionSubtitle} // Menggunakan subtitle dari constants
      editMode={editMode}
      onEditClick={() => handleEditClick("termsConditionsSection")}
      onCancelClick={() => handleEditClick("termsConditionsSection")}
      onSaveClick={() => {
        setTimeout(() => {
          handleSaveClick("termsConditionsSection"); // Panggil save setelah update state
        }, 100); // Beri waktu 100ms untuk memastikan state diperbarui
      }}
      sectionName="termsConditionsSection"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            {labels.termsConditionsLabel}{" "}
          </CustomTypography>
        </Grid>

        <Grid item xs={12}>
          {!editMode ? (
            sanitizedContent ? (
              // Merender konten yang sudah dibersihkan dengan aman
              <Box
                sx={{ fontWeight: "light", fontSize: "small" }}
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            ) : (
              <CustomTypography
                fontWeight="fontWeightLight"
                fontSize="fontSizeSmall"
                sx={{ fontStyle: "italic", color: "gray" }}
              >
                {labels.noTermsAvailableText}{" "}
              </CustomTypography>
            )
          ) : (
            <Box sx={{ width: "100%" }}>
              <RichTextEditor
                ref={rteRef}
                extensions={[StarterKit]} // Hanya gunakan StarterKit
                content={
                  formData.termsConditions || labels.defaultTermsPlaceholder // Menggunakan placeholder dari constants
                }
                onUpdate={handleRichTextChange} // Tambahkan event onUpdate untuk menangani perubahan real-time
                renderControls={() => (
                  <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuButtonBulletedList />{" "}
                    {/* Tombol untuk Unordered List */}
                    <MenuButtonOrderedList /> {/* Tombol untuk Ordered List */}
                  </MenuControlsContainer>
                )}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </SectionAccordion>
  );
};

export default TermsConditionSection;
