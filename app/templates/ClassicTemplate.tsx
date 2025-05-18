"use client"

import { QRCodeCanvas } from "qrcode.react"

interface CertificateData {
  recipientName: string
  certificateTitle: string
  issuerName: string
  issueDate: Date
  description: string
  selectedTemplate: number
  borderStyle: string
  primaryColor: string
  secondaryColor: string
  font: string
  logo?: File
  signature?: File
  certificateNumber: string
  qrCode: boolean
  watermark: boolean
  selectedText: string | null
  selectedElement: string | null
}

interface ClassicTemplateProps {
  data: CertificateData
  onTextSelect?: (text: string, element: string) => void
}

export default function ClassicTemplate({ data, onTextSelect }: ClassicTemplateProps) {
  const handleTextSelection = (element: string) => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      onTextSelect?.(selection.toString(), element)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div
      className={`relative h-full text-black border-8 ${data.borderStyle === "classic"
        ? "border-double border-[#c9a84b]"
        : data.borderStyle === "modern"
          ? "border-solid border-gray-800"
          : data.borderStyle === "ornate"
            ? "border-[16px] border-double border-[#8b6c15]"
            : "border-solid border-gray-300"
        } p-8`}
    >
      {/* Background Watermark */}
      {data.watermark && data.logo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
          <img
            src={URL.createObjectURL(data.logo) || "/placeholder.svg"}
            alt="Watermark"
            className="w-2/3 h-2/3 object-contain"
          />
        </div>
      )}

      {/* Logo */}
      {data.logo && (
        <div className="absolute top-3 left-3 w-16 h-16 z-10">
          <img
            src={URL.createObjectURL(data.logo) || "/placeholder.svg"}
            alt="Organization Logo"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className={`relative text-center ${data.font} z-10 `}>
        <h1
          className="text-2xl font-bold cursor-text"
          style={{ color: data.primaryColor }}
          onMouseUp={() => handleTextSelection("title")}
        >
          {data.certificateTitle || "Certificate of Achievement"}
        </h1>

        <p className="text-lg cursor-text mt-2" onMouseUp={() => handleTextSelection("subtitle")}>
          This is to certify that
        </p>

        <h2
          className="text-2xl font-bold cursor-text mt-3"
          style={{ color: data.secondaryColor }}
          onMouseUp={() => handleTextSelection("recipientName")}
        >
          {data.recipientName}
        </h2>

        <p className="text-lg max-w-2xl mx-auto cursor-text mt-2 z-50" onMouseUp={() => handleTextSelection("description")}>
          {data.description}
        </p>


      </div>

      <div className="absolute bottom-1 -left-8 flex flex-row items-end px-12 gap-12">
        <div >
          {data.signature && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(data.signature) || "/placeholder.svg"}
                alt="Signature"
                className="w-32 h-12 object-contain"
              />
            </div>
          )}
          <div className="w-36 h-0.5 bg-gray-400" />
          <p className="mt-1 text-sm" onMouseUp={() => handleTextSelection("date")}>
            Date: {formatDate(data.issueDate)}
          </p>
        </div>

        {/* <div className="text-center">
          {data.issuerName && (
            <>
              <div className="h-0.5 w-36 bg-gray-400" />
              <p className="mt-2 text-sm cursor-text" onMouseUp={() => handleTextSelection("issuerName")}>
                {data.issuerName}
              </p>
            </>
          )}
        </div> */}
      </div>


      {/* Certificate Number and QR Code */}
      <div className="absolute bottom-0 right-1">

        {data.qrCode && (
          <div className="bg-white p-1">
            <QRCodeCanvas
              value={`https://your-domain.com/verify/${data.certificateNumber}`}
              size={64}
              level="H"
              includeMargin={true}
            />
          </div>
        )}
      </div>

      <div className="absolute -bottom-8 left-0 right-0">
        <p className="text-sm text-gray-500 cursor-text" onMouseUp={() => handleTextSelection("certificateNumber")}>
          Certificate No: {data.certificateNumber}
        </p>
      </div>
    </div>
  )
}
