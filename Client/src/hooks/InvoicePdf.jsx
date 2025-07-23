import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

const formatPrice = (val) => `Rs. ${val.toFixed(2)}`;


export const generateInvoice = async (order) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Logo
  const logoUrl = "/logo.png";
  const logo = await fetch(logoUrl).then((res) => res.blob());
  const logoReader = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(logo);
  });
  doc.addImage(logoReader, "PNG", 160, 20, 30, 30);

  // Company Details
  doc.setFontSize(11);
  doc.setFont("helvetica","normal", "bold");
  doc.text("RakhiStore Pvt. Ltd.", 15, 30);
  doc.setFont("helvetica", "normal");
  doc.text("Kuthaunda, Orai, Jalaun, UP", 15, 36);
  doc.text("Email: support@rakhistore.in", 15, 41);
  doc.text("Phone: +91 7905321201", 15, 46);

  // Bill To
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", 15, 65);
  doc.setFont("helvetica", "normal");
  doc.text(order.customerName, 15, 71);
  doc.text(order.address, 15, 76);

  // Invoice Info
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 130, 65);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice ID: ${order.id}`, 130, 71);
  doc.text(`Order Date: ${order.orderDate}`, 130, 76);

  // Items Table
  const tableRows = order.items.map((item) => [
  String(item.productName || ""),
  String(item.quantity || "1"),
  formatPrice(Number(item.price || 0)),
  formatPrice(Number(item.price || 0) * Number(item.quantity || 1)),
]);

  autoTable(doc, {
    startY: 90,
    head: [["Description", "Qty", "Unit Price", "Amount"]],
    body: tableRows,
    styles: { fontSize: 10 },
    headStyles: {fillColor: [240, 240, 240],textColor: [0, 0, 0],  },
    theme: "grid",
  });

  const finalY = doc.lastAutoTable.finalY + 5;

  // Totals
  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);



  doc.setFontSize(11);
  doc.text("Subtotal", 140, finalY);
  doc.text(formatPrice(subtotal), 180, finalY, { align: "right" });

  // doc.text("GST (18%)", 140, finalY + 6);
  // doc.text(formatPrice(gst), 180, finalY + 6, { align: "right" });

  // if (discount > 0) {
  //   doc.text("Discount", 140, finalY + 12);
  //   doc.text(`-${formatPrice(discount)}`, 180, finalY + 12, { align: "right" });
  // }

  doc.setFont("helvetica", "bold");
  doc.text("Total", 140, finalY + 20);
  doc.text(formatPrice(subtotal), 180, finalY + 20, { align: "right" });

  // Payment Info
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT INFO", 15, finalY + 35);
  doc.setFont("helvetica", "normal");
  doc.text("UPI ID: rakhistore@upi", 15, finalY + 41);
  doc.text("Payment Ref: INV-" + order.id, 15, finalY + 46);

  // Terms
  doc.setFont("helvetica", "bold");
  doc.text("TERMS & CONDITIONS", 15, finalY + 60);
  doc.setFont("helvetica", "normal");
  doc.text("Please make the payment within 7 days.", 15, finalY + 66);
  doc.text("No returns allowed on customized Rakhis.", 15, finalY + 71);

  // Optional QR Code
  // const qrData = await QRCode.toDataURL(`https://rakhistore.in/order/${order.id}`);
  // doc.addImage(qrData, "PNG", 160, finalY + 40, 30, 30);

  doc.save(`invoice-${order.id}.pdf`);
};
