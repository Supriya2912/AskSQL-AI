import { useState } from "react";
import { Database, Copy, Check } from "lucide-react";
import TypingText from "./TypingText";

function SQLCard({ sql }) {

  const [copied, setCopied] = useState(false);

  const copySQL = async () => {

    try {

      await navigator.clipboard.writeText(sql);

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">

        <div className="flex items-center gap-2">

          <Database size={18} />

          <h3 className="font-semibold">

            Generated SQL

          </h3>

        </div>

        <button

          onClick={copySQL}

          className="flex items-center gap-2 text-sm hover:bg-gray-200 px-3 py-2 rounded-lg transition"

        >

          {

            copied ?

              <>

                <Check size={16} />

                Copied

              </>

              :

              <>

                <Copy size={16} />

                Copy

              </>

          }

        </button>

      </div>

      {/* SQL */}

      <div className="bg-[#0d1117] text-green-400 p-6 overflow-x-auto">

        <TypingText

          text={sql}

          speed={8}

        />

      </div>

    </div>

  );

}

export default SQLCard;