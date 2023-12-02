{
  description = "kanbas";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShell = pkgs.mkShell {
        name = "hph-web-app";
        buildInputs = with pkgs; [
          nodejs_18
        ];
        REACT_APP_API_BASE = "http://localhost:4000/api";
        shellHook = ''
          export PATH=$PWD/src/frontend/node_modules/.bin:$PATH
        '';
      };
    });
}
